namespace SpriteKind {
    export const BossProjectile = SpriteKind.create()
}
function handle_a (player2: number) {
    if (boss_index == player2) {
        timer.throttle("boss_change_phase", statusbars.getStatusBarAttachedTo(StatusBarKind.Health, boss).max, function () {
            boss_last_phase = boss_phase
            boss_phase = -1
            boss_last_phase_switch = game.runtime()
            timer.after(1000, function () {
                boss_phase = boss_last_phase
                boss_phase += 1
                if (boss_phase > 3) {
                    boss_phase = 0
                }
            })
        })
    } else {
        shoot_player_bullet(player2)
    }
}
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    handle_b(2)
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    handle_b(1)
})
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
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    handle_b(3)
})
function boss_handle_phase_2 () {
    for (let offset = 0; offset <= 90; offset++) {
        for (let index = 0; index <= 11; index++) {
            spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + offset * (360 / 90)), 80)
        }
        pause(250)
        if (boss_phase != 2) {
            return
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossProjectile, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
    otherSprite.destroy()
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    handle_a(1)
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
    a_statusbar = statusbars.create(30, 1, StatusBarKind.Energy)
    a_statusbar.setColor(3, 0)
    a_statusbar.max = 1000
    a_statusbar.value = 0
    a_statusbar.positionDirection(CollisionDirection.Top)
    a_statusbar.setStatusBarFlag(StatusBarFlag.ConstrainAssignedValue, true)
    a_statusbar.attachToSprite(boss, 4, 0)
}
function boss_handle_phase_0 () {
    for (let index = 0; index < 3; index++) {
        for (let offset = 0; offset <= 2; offset++) {
            for (let index = 0; index <= 17; index++) {
                spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + 360 / 18 / 3 * offset), 60)
            }
            pause(200)
            if (boss_phase != 0) {
                return
            }
        }
        if (boss_phase != 0) {
            return
        }
    }
    pause(2000)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
    otherSprite.destroy()
})
function handle_b (player2: number) {
    if (boss_index == player2) {
        timer.throttle("boss_change_phase", statusbars.getStatusBarAttachedTo(StatusBarKind.Health, boss).max, function () {
            boss_last_phase = boss_phase
            boss_phase = -1
            boss_last_phase_switch = game.runtime()
            timer.after(1000, function () {
                boss_phase = boss_last_phase
                boss_phase += -1
                if (boss_phase < 0) {
                    boss_phase = 3
                }
            })
        })
    }
}
function boss_handle_phase_1 () {
    for (let index = 0; index < 3; index++) {
        for (let offset = 0; offset <= 2; offset++) {
            for (let index = 0; index <= 17; index++) {
                spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + 360 / 18 / 3 * (2 - offset)), 60)
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
function boss_stop_phases () {
    boss_phase = 0
    boss_last_phase_switch = game.runtime() + a_statusbar.max
}
function start_game () {
    in_game = true
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    status.spriteAttachedTo().destroy()
})
function boss_handle_phase (phase: number) {
    boss_phase = phase
    if (phase == 0) {
        boss_handle_phase_0()
    } else if (phase == 1) {
        boss_handle_phase_1()
    } else if (phase == 2) {
        boss_handle_phase_2()
    } else if (phase == 3) {
        boss_handle_phase_3()
    }
}
function boss_handle_phase_3 () {
    for (let offset = 0; offset <= 90; offset++) {
        for (let index = 0; index <= 11; index++) {
            spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + (90 - offset) * (360 / 90)), 80)
        }
        pause(250)
        if (boss_phase != 3) {
            return
        }
    }
}
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    handle_a(3)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    handle_a(0)
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
    handle_a(2)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    boss_stop_phases()
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    handle_b(0)
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
function align_status_bar (sbar_in_list: StatusBarSprite[], top_limit: number) {
    if (sbar_in_list[0].spriteAttachedTo().top < top_limit) {
        sbar_in_list[0].positionDirection(CollisionDirection.Bottom)
    } else {
        sbar_in_list[0].positionDirection(CollisionDirection.Top)
    }
}
let a_player: Sprite = null
let in_game = false
let a_statusbar: StatusBarSprite = null
let bullet: Sprite = null
let boss_bullet_image: Image = null
let boss_last_phase_switch = 0
let boss_last_phase = 0
let boss: Sprite = null
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
boss_phase = 0
game.onUpdate(function () {
    if (!(spriteutils.isDestroyed(boss))) {
        if (boss.y > scene.screenHeight() * (1 / 3)) {
            boss.y = scene.screenHeight() * (1 / 3)
        }
        align_status_bar([statusbars.getStatusBarAttachedTo(StatusBarKind.Health, boss)], 6)
        a_statusbar = statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, boss)
        align_status_bar([a_statusbar], 6)
        a_statusbar.value = a_statusbar.max - (game.runtime() - boss_last_phase_switch)
        if (a_statusbar.value == 0) {
            a_statusbar.setColor(3, 0)
        } else {
            a_statusbar.setColor(3, 12)
        }
        for (let value of sprites.allOfKind(SpriteKind.Player)) {
            align_status_bar([statusbars.getStatusBarAttachedTo(StatusBarKind.Health, value)], 4)
        }
    }
})
forever(function () {
    if (!(spriteutils.isDestroyed(boss))) {
        if (boss_phase >= 0) {
            boss_handle_phase(boss_phase)
        }
    }
})
