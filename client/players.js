import React from 'react'
import { create as createStore } from 'zustand'
import { gameGun } from './game.js'
import { user, onAuthChange, useCurrentUser } from './auth.js'

const usePlayers = createStore(() => ({}))
export { usePlayers }

gameGun.get('players').map().on((player, id) => {
  if (!player || !player.username) return
  usePlayers.setState({
    [id]: player
  })
})

let interval
onAuthChange(currentUser => {
  console.log('AUTH CHANGE', { currentUser })
  clearInterval(interval)
  if (currentUser) initPlayerMe(currentUser)
})

if (user.is) initPlayerMe()

function initPlayerMe(currentUser) {
  let me = Object.values(usePlayers.getState)
    .find(p => p.id === currentUser.id)
  if (!me){
    me = gameGun.get('players').get(user.is.pub)
      .put({...currentUser, x: 0, y: 0})
  }
  console.log('ME!', { me })
  // const me = gameGun.get('players').get(user.is.pub)

  // let x = 0, y = 0
  // interval = setInterval(() => {
  //   me.put({...currentUser, x, y})
  // }, 2000)

}

export function useCurrentPlayer(){
  const currentUser = useCurrentUser()
  const players = usePlayers()
  const player = Object.values(players).find(p => p.id === currentUser.id )
  return React.useMemo(
    () => new CurrentPlayer(currentUser.id, player),
    [currentUser.id]
  )
}

class CurrentPlayer {
  constructor(id, state = {}) {
    this.state = {}
  }
}
