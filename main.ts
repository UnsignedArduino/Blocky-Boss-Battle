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
        boss_index = players.indexOf(boss)
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
    bullet = sprites.create(boss_bullet_image, SpriteKind.Projectile)
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
                    pause(100)
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
function boss_start_phase_1 () {
    boss_phase = 1
    timer.background(function () {
        while (boss_phase == 1) {
            for (let index = 0; index < 3; index++) {
                for (let offset = 0; offset <= 2; offset++) {
                    for (let index = 0; index <= 17; index++) {
                        spriteutils.setVelocityAtAngle(get_boss_bullet(), spriteutils.degreesToRadians(360 / 12 * index + 360 / 18 / 3 * offset), 60)
                    }
                    pause(100)
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
function create_boss (number: number) {
    if (number == 0) {
        boss = sprites.create(assets.image`boss_p1`, SpriteKind.Enemy)
        controller.player1.moveSprite(boss, 20, 20)
    } else if (number == 1) {
        boss = sprites.create(assets.image`boss_p2`, SpriteKind.Enemy)
        controller.player2.moveSprite(boss, 20, 20)
    } else if (number == 2) {
        boss = sprites.create(assets.image`boss_p3`, SpriteKind.Enemy)
        controller.player3.moveSprite(boss, 20, 20)
    } else {
        boss = sprites.create(assets.image`boss_p4`, SpriteKind.Enemy)
        controller.player4.moveSprite(boss, 20, 20)
    }
    boss.z = 1
    boss.setFlag(SpriteFlag.StayInScreen, true)
    boss.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.15)
    players[number] = boss
}
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
                pause(200)
                if (boss_phase != 4) {
                    return
                }
            }
        }
    })
}
function create_player (number: number) {
    if (number == 0) {
        a_player = sprites.create(assets.image`player_p1`, SpriteKind.Player)
        controller.player1.moveSprite(a_player, 50, 50)
    } else if (number == 1) {
        a_player = sprites.create(assets.image`player_p2`, SpriteKind.Player)
        controller.player2.moveSprite(a_player, 50, 50)
    } else if (number == 2) {
        a_player = sprites.create(assets.image`player_p3`, SpriteKind.Player)
        controller.player3.moveSprite(a_player, 50, 50)
    } else {
        a_player = sprites.create(assets.image`player_p4`, SpriteKind.Player)
        controller.player4.moveSprite(a_player, 50, 50)
    }
    a_player.setPosition(scene.screenWidth() / 5 * (number + 1), scene.screenHeight() * 0.85)
    a_player.z = 1
    a_player.setFlag(SpriteFlag.StayInScreen, true)
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
                pause(200)
                if (boss_phase != 3) {
                    return
                }
            }
        }
    })
}
let a_player: Sprite = null
let in_game = false
let bullet: Sprite = null
let boss_bullet_image: Image = null
let boss: Sprite = null
let boss_index = 0
let boss_phase = 0
let players: Sprite[] = []
stats.turnStats(true)
players = [
]
start_game()
create_player(0)
create_player(2)
create_player(3)
create_boss(1)
boss_start_phase(1)
