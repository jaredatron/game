import React from 'react'
import gun, { user } from './gun.js'
import GameState from './GameState.js'
import { useCurrentUser, signUp, signIn, signOut } from './auth.js'

export default function App(){
  const currentUser = useCurrentUser()
  return <div>
    <h4>APP</h4>
    <GameState/>
    {currentUser
      ? <CurrentUser/>
      : <LoginForm/>
    }
    <SpeakForm/>
  </div>
}

function LoginForm(){
  const signup = event => {
    const { username, secret } = getFormValues(event)
    signUp(username, secret)
  }
  const signin = event => {
    const { username, secret } = getFormValues(event)
    signIn(username, secret)
  }
  const onSubmit = event => { event.preventDefault(); }
  return <form {...{onSubmit}}>
    <input name="username" type="text" placeholder="username"/>
    <input name="secret" type="password" placeholder="secret"/>
    <button type="submit" onClick={signup}>sign up</button>
    <button type="submit" onClick={signin}>sign in</button>
  </form>
}



function CurrentUser() {
  const currentUser = useCurrentUser()
  return <div>
    <pre>currentUser={JSON.stringify(currentUser, null, 2)}</pre>
    <button onClick={signOut}>sign out</button>
  </div>
}
function SpeakForm(){
  const onSubmit = event => {
    event.preventDefault();
    const input = event.target.statement
    const { value } = input
    // user.get('said').set(value)
    gun.get('game').get('state').put({ said: value })
    input.value = ''
  }
  return <form {...{onSubmit}}>
    <input name="statement" type="text" placeholder="say something…"/>
    <button type="submit">speak</button>
  </form>
}

function getFormValues(event){
  const { form } = event.target
  const formData = new FormData(form)
  return Object.fromEntries(formData.entries())
}
