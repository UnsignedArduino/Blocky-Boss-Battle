namespace SpriteKind {
    export const BossProjectile = SpriteKind.create()
}
function boss_start_phase (phase: number) {
    boss_phase = phase
    if (phase == 1) {
        boss_start_phase_1()
    } else if (phase == 2) {
        boss_start_phase_2()
    } else if (phase == 3) {
        boss_start_phase_3()
    } else if (phase == 4) {
        boss_start_phase_4()
    } else {
        boss_stop_phases()
    }
}
function get_boss_bullet () {
    let boss_bullet_color = 0
    if (boss_bullet_color == 0) {
        if (boss_index == 0) {
            boss_bullet_image = assets.image`boss_bullet_p1`
        } else if (boss_index == 1) {
            boss_bullet_image = assets.image`boss_bullet_p2`
        } else if (boss_index == 2) {
            boss_bullet_image = assets.image`boss_bullet_p3`
        } else {
            boss_bullet_image = assets.image`boss_bullet_p4`
        }
    }
    bullet = sprites.create(boss_bullet_image, SpriteKind.BossProjectile)
    bullet.setFlag(SpriteFlag.AutoDestroy, true)
    spriteutils.placeAngleFrom(
    bullet,
    0,
    0,
    boss
    )
    return bullet
}
function boss_start_phase_2 () {
    boss_phase = 2
    timer.background(function () {
        while (boss_phase == 2) {
            for (let index = 0; index < 3; index++) {
                for (let offset = 0; offset <= 2; offset++) {
                    for (let index = 0; index <= 17; index++) {
                        spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + 360 / 18 / 3 * (2 - offset)), 60)
                    }
                    pause(200)
                    if (boss_phase != 2) {
                        return
                    }
                }
                if (boss_phase != 2) {
                    return
                }
            }
            pause(2000)
        }
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossProjectile, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
    otherSprite.destroy()
})
function boss_start_phase_1 () {
    boss_phase = 1
    timer.background(function () {
        while (boss_phase == 1) {
            for (let index = 0; index < 3; index++) {
                for (let offset = 0; offset <= 2; offset++) {
                    for (let index = 0; index <= 17; index++) {
                        spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + 360 / 18 / 3 * offset), 60)
                    }
                    pause(200)
                    if (boss_phase != 1) {
                        return
                    }
                }
                if (boss_phase != 1) {
                    return
                }
            }
            pause(2000)
        }
    })
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (boss_index != 1) {
        shoot_player_bullet(1)
    }
})
function create_boss (number: number) {
    a_statusbar = statusbars.create(30, 1, StatusBarKind.Health)
    if (number == 0) {
        boss = sprites.create(assets.image`boss_p1`, SpriteKind.Enemy)
        controller.player1.moveSprite(boss, 20, 20)
        a_statusbar.setColor(2, 12)
    } else if (number == 1) {
        boss = sprites.create(assets.image`boss_p2`, SpriteKind.Enemy)
        controller.player2.moveSprite(boss, 20, 20)
        a_statusbar.setColor(9, 12)
    } else if (number == 2) {
        boss = sprites.create(assets.image`boss_p3`, SpriteKind.Enemy)
        controller.player3.moveSprite(boss, 20, 20)
        a_statusbar.setColor(4, 12)
    } else {
        boss = sprites.create(assets.image`boss_p4`, SpriteKind.Enemy)
        controller.player4.moveSprite(boss, 20, 20)
        a_statusbar.setColor(7, 12)
    }
    boss.z = 1
    boss.setFlag(SpriteFlag.StayInScreen, true)
    boss.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.15)
    players[number] = boss
    boss_index = number
    a_statusbar.max = 100
    a_statusbar.value = a_statusbar.value
    a_statusbar.positionDirection(CollisionDirection.Top)
    a_statusbar.attachToSprite(boss, 2, 0)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
    otherSprite.destroy()
})
function boss_stop_phases () {
    boss_phase = 0
}
function start_game () {
    in_game = true
}
function boss_start_phase_4 () {
    boss_phase = 4
    timer.background(function () {
        while (boss_phase == 4) {
            for (let offset = 0; offset <= 90; offset++) {
                for (let index = 0; index <= 11; index++) {
                    spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + (90 - offset) * (360 / 90)), 80)
                }
                pause(250)
                if (boss_phase != 4) {
                    return
                }
            }
        }
    })
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    status.spriteAttachedTo().destroy()
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (boss_index != 3) {
        shoot_player_bullet(3)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (boss_index != 0) {
        shoot_player_bullet(0)
    }
})
function shoot_player_bullet (number: number) {
    if (number == 0) {
        bullet = sprites.create(assets.image`player_p1_bullet`, SpriteKind.Projectile)
    } else if (number == 1) {
        bullet = sprites.create(assets.image`player_p2_bullet`, SpriteKind.Projectile)
    } else if (number == 2) {
        bullet = sprites.create(assets.image`player_p3_bullet`, SpriteKind.Projectile)
    } else {
        bullet = sprites.create(assets.image`player_p4_bullet`, SpriteKind.Projectile)
    }
    bullet.setFlag(SpriteFlag.AutoDestroy, true)
    spriteutils.placeAngleFrom(
    bullet,
    0,
    0,
    players[number]
    )
    bullet.vy = -150
}
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (boss_index != 2) {
        shoot_player_bullet(2)
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    boss_stop_phases()
})
function create_player (number: number) {
    a_statusbar = statusbars.create(10, 1, StatusBarKind.Health)
    if (number == 0) {
        a_player = sprites.create(assets.image`player_p1`, SpriteKind.Player)
        a_statusbar.setColor(2, 12)
        controller.player1.moveSprite(a_player, 50, 50)
    } else if (number == 1) {
        a_player = sprites.create(assets.image`player_p2`, SpriteKind.Player)
        a_statusbar.setColor(9, 12)
        controller.player2.moveSprite(a_player, 50, 50)
    } else if (number == 2) {
        a_player = sprites.create(assets.image`player_p3`, SpriteKind.Player)
        a_statusbar.setColor(4, 12)
        controller.player3.moveSprite(a_player, 50, 50)
    } else {
        a_player = sprites.create(assets.image`player_p4`, SpriteKind.Player)
        a_statusbar.setColor(7, 12)
        controller.player4.moveSprite(a_player, 50, 50)
    }
    a_player.setPosition(scene.screenWidth() / 5 * (number + 1), scene.screenHeight() * 0.85)
    a_player.z = 1
    a_player.setFlag(SpriteFlag.StayInScreen, true)
    a_statusbar.max = 20
    a_statusbar.value = a_statusbar.value
    a_statusbar.positionDirection(CollisionDirection.Top)
    a_statusbar.attachToSprite(a_player, 2, 0)
    players[number] = a_player
}
function boss_start_phase_3 () {
    boss_phase = 3
    timer.background(function () {
        while (boss_phase == 3) {
            for (let offset = 0; offset <= 90; offset++) {
                for (let index = 0; index <= 11; index++) {
                    spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + offset * (360 / 90)), 80)
                }
                pause(250)
                if (boss_phase != 3) {
                    return
                }
            }
        }
    })
}
let a_player: Sprite = null
let in_game = false
let a_statusbar: StatusBarSprite = null
let boss: Sprite = null
let bullet: Sprite = null
let boss_bullet_image: Image = null
let boss_index = 0
let boss_phase = 0
let players: Sprite[] = []
stats.turnStats(true)
players = []
start_game()
create_player(0)
create_player(2)
create_player(3)
create_boss(1)
boss_start_phase(3)
