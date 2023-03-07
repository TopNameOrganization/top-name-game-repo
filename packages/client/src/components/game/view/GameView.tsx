import React, { useRef, useEffect, useState } from 'react'
import { Box, Paper, Grid } from '@mui/material'

import { RunnerAction, TileSize, Tile } from '../constants'
import GameModel from '../model/GameModel'
import {
  ModelEvents,
  RunnerInfoType,
  PositionType,
  LevelMapType,
  MessageType,
  ModelMessageType,
} from '../model'

import { Result } from './result'
import { MessageScreen, MessageScreenProps } from './messageScreen'
import { PauseActions } from './pauseActions'
import { Sprite } from './sprite'
import { tileCfg } from './spriteConfigs'
import { playerCfg } from './spriteConfigs'
import { enemyCfg } from './spriteConfigs'

const width = 32 * TileSize
const height = 22 * TileSize

export const GameView = () => {
  const [level, setLevel] = useState<number>(1)
  const [score, setScore] = useState<number>(0)
  const [rest, setRest] = useState<number>(0)
  const [message, setMessage] = useState<MessageScreenProps | null>(null)
  // const [enemySprites, setEnemySprites] = useState<Array<Sprite>>([]);

  const worldRef = useRef<HTMLCanvasElement>(null)
  const actorsRef = useRef<HTMLCanvasElement>(null)

  const tileSpr = new Sprite(tileCfg)
  const playerSpr = new Sprite(playerCfg)
  const enemySprites: Array<Sprite> = []

  const updateWorld = ({
    level,
    burn,
    enemies,
  }: {
    level?: LevelMapType
    burn?: PositionType
    enemies?: number
  }) => {
    const ctx = worldRef.current?.getContext('2d')
    if (ctx) {
      if (level) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, width, height)
        level?.map((item, y) => {
          item.map((tile, x) => {
            if (![Tile.Empty, Tile.Player, Tile.Enemy].includes(tile)) {
              ctx.drawImage(
                tileSpr.getPhase(0, tile),
                x * TileSize,
                y * TileSize
              )
            }
          })
        })
      }
      if (enemies && enemies > 0) {
        while (enemySprites.length < enemies) {
          enemySprites.push(new Sprite(enemyCfg))
        }
      }
      if (burn) {
        const { x, y } = burn
        ctx.fillStyle = 'black'
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize)
      }
    }
  }

  const drawFrame = (data: {
    dTime: number
    player: RunnerInfoType
    enemies: Array<RunnerInfoType>
  }) => {
    const ctx = actorsRef.current?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      const { player, enemies, dTime } = data
      if (player) {
        const { x, y, phase, direction } = player
        ctx.drawImage(playerSpr.getPhase(dTime, phase, direction), x, y)
      }
      if (enemies.length > 0) {
        enemies.map((runner, i) => {
          const { x, y, phase, direction } = runner
          ctx.drawImage(enemySprites[i].getPhase(dTime, phase, direction), x, y)
        })
      }
    }
  }

  const updateLevel = (n: number) => {
    setLevel(n + 1)
  }

  const updateScore = (n: number) => {
    setScore(n)
  }

  const updateRest = (n: number) => {
    setRest(n)
  }

  const onMessage = ({
    type,
    noRest = true,
    title,
    message,
  }: ModelMessageType) => {
    switch (type) {
      case MessageType.Hide:
        setMessage(null)
        break
      case MessageType.Message:
        setMessage({ title, message })
        break
      case MessageType.Pause:
        setMessage({
          title,
          message,
          children: (
            <PauseActions
              onReplay={() => GameModel.replay()}
              onLevelUp={() => GameModel.levelUp()}
              onOver={() => GameModel.gameOver()}
              noRest={noRest}
            />
          ),
        })
        break
      default:
    }
  }

  const onKeyUp = (evt: KeyboardEvent): void => {
    const { keyCode } = evt
    if (GameModel.lastPressed === keyCode) {
      if (
        keyCode >= RunnerAction.MoveLeft &&
        keyCode <= RunnerAction.MoveDown
      ) {
        evt.preventDefault()
        evt.stopImmediatePropagation()
        GameModel.setPlayerAction(RunnerAction.Stay)
      }
    }

    if ([27, 80].includes(keyCode)) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      GameModel.togglePause()
    }
  }

  const onKeyDown = (evt: KeyboardEvent): void => {
    const { keyCode, repeat } = evt
    if (!repeat && ![27, 80].includes(keyCode)) {
      GameModel.resetPause()
    }
    if (keyCode >= RunnerAction.MoveLeft && keyCode <= RunnerAction.MoveDown) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      GameModel.setPlayerAction(keyCode)
      GameModel.setLastPressed(keyCode)
    }
    if (keyCode === 32) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      GameModel.burn()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    GameModel.on(ModelEvents.UpdateWorld, updateWorld)
    GameModel.on(ModelEvents.Update, drawFrame)
    GameModel.on(ModelEvents.LevelUp, updateLevel)
    GameModel.on(ModelEvents.UpdateScore, updateScore)
    GameModel.on(ModelEvents.UpdateRest, updateRest)
    GameModel.on(ModelEvents.Message, onMessage)
    GameModel.init()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      GameModel.off(ModelEvents.UpdateWorld, updateWorld)
      GameModel.off(ModelEvents.Update, drawFrame)
      GameModel.off(ModelEvents.LevelUp, updateLevel)
      GameModel.off(ModelEvents.UpdateScore, updateScore)
      GameModel.off(ModelEvents.UpdateRest, updateRest)
      GameModel.off(ModelEvents.Message, onMessage)
    }
  }, [])

  return (
    <Box
      component={Paper}
      pt={2}
      pb={4}
      mt={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {message && (
        <MessageScreen title={message.title} message={message.message}>
          {message.children}
        </MessageScreen>
      )}
      <Box
        sx={{
          width,
          height,
          border: '4px solid black',
        }}>
        <canvas ref={worldRef} width={width} height={height} />
        <canvas
          ref={actorsRef}
          width={width}
          height={height}
          style={{
            position: 'relative',
            top: `${-height - 2}px`,
          }}
        />
      </Box>
      <Grid container spacing={10} sx={{ width }}>
        <Grid item xs={4}>
          <Result label="score">{score}</Result>
        </Grid>
        <Grid item xs={4}>
          <Result label="level">{level}</Result>
        </Grid>
        <Grid item xs={4}>
          <Result label="rest">{rest}</Result>
        </Grid>
      </Grid>
    </Box>
  )
}
