namespace SpriteKind {
    export const Portal = SpriteKind.create()
    export const Ending = SpriteKind.create()
    export const Teeth = SpriteKind.create()
    export const Saw = SpriteKind.create()
    export const Camera = SpriteKind.create()
    export const Net = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const House = SpriteKind.create()
    export const Key = SpriteKind.create()
}
function configureLevel () {
    binTeeth()
    makePortals()
    keysHeld = 0
    hasKey = false
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    for (let value of sprites.allOfKind(SpriteKind.Portal)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`startTile`)) {
        tiles.placeOnTile(mySprite, value)
        tiles.setTileAt(value, sprites.dungeon.floorDark0)
    }
    for (let value of tiles.getTilesByType(assets.tile`endTile`)) {
        tiles.placeOnTile(Ending2, value)
        tiles.setTileAt(value, sprites.dungeon.floorDark0)
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.chestOpen)) {
        key = sprites.create(assets.image`key`, SpriteKind.Key)
        tiles.placeOnTile(key, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`cameraTile`)) {
        placeCamera(value.column, value.row)
        tiles.setTileAt(value, sprites.dungeon.floorDark0)
    }
    for (let value of tiles.getTilesByType(assets.tile`houseTile`)) {
        placeHouse2(value.column, value.row)
        tiles.setTileAt(value, sprites.dungeon.floorDark0)
    }
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.purpleSwitchUp)) {
        if (keysHeld > 0) {
            unlockDoor(location.row, location.column)
        } else {
            game.splash("You need a key!")
        }
    } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.stairLadder)) {
        if (Level == 7) {
            game.splash("The code is 4-1-2-3-5")
            for (let value of tiles.getTilesByType(sprites.dungeon.floorMixed)) {
                tiles.setTileAt(value, sprites.dungeon.collectibleBlueCrystal)
                music.beamUp.play()
            }
        }
    } else {
    	
    }
})
function level4 () {
    binTeeth()
    makePortals()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 4
    tiles.setTilemap(tilemap`level0`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 4))
    tiles.placeOnTile(Portal1, tiles.getTileLocation(14, 4))
    tiles.placeOnTile(Portal2, tiles.getTileLocation(11, 10))
    Teeth1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth1, tiles.getTileLocation(3, 4))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(1, 9))
    sawSprite = sprites.create(assets.image`myImage9`, SpriteKind.Saw)
    tiles.placeOnTile(sawSprite, tiles.getTileLocation(7, 12))
    sawSprite.setVelocity(75, 0)
    Portal3.destroy()
    Portal4.destroy()
    Portal5.destroy()
    Portal6.destroy()
    placeCamera(11, 5)
}
sprites.onOverlap(SpriteKind.House, SpriteKind.Boss, function (sprite, otherSprite) {
    if (bossIsRed) {
    	
    } else {
        bossHealth += -2
        music.zapped.play()
    }
    if (bossHealth <= 0) {
        otherSprite.startEffect(effects.spray)
        otherSprite.destroy()
        tiles.setTileAt(tiles.getTileLocation(1, 12), sprites.dungeon.floorDarkDiamond)
        tiles.setWallAt(tiles.getTileLocation(1, 12), false)
    }
    music.smallCrash.play()
    sprite.startEffect(effects.spray)
    sprite.destroy()
    placeHouse2(9, 3)
})
function placeCamera (x: number, y: number) {
    camera1 = sprites.create(assets.image`Camera1`, SpriteKind.Camera)
    camera1.fx = 0
    tiles.placeOnTile(camera1, tiles.getTileLocation(x, y))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Net, function (sprite, otherSprite) {
    otherSprite.destroy()
    die()
})
function binTeeth () {
    for (let value of sprites.allOfKind(SpriteKind.Teeth)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Saw)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Camera)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.House)) {
        value4.destroy()
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Boss)) {
        value5.destroy()
    }
    for (let value6 of sprites.allOfKind(SpriteKind.Ending)) {
        value6.destroy()
    }
}
function placeHouse () {
	
}
function level1 () {
    binTeeth()
    makePortals()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 1
    Portal1.setPosition(100, 200)
    Portal2.setPosition(105, 228)
    tiles.setTilemap(tilemap`level1_real`)
    mySprite.setPosition(20, 216)
    tiles.placeOnTile(Portal3, tiles.getTileLocation(14, 11))
    tiles.placeOnTile(Portal4, tiles.getTileLocation(14, 1))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(11, 7))
    Portal5.destroy()
    Portal6.destroy()
}
function unlockDoor (row: number, col: number) {
    for (let value of tiles.getTilesByType(sprites.dungeon.stairSouth)) {
        if (value.column == col + 1) {
            tiles.setTileAt(value, sprites.dungeon.floorDark0)
            tiles.setWallAt(value, false)
            music.spooky.play()
        }
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.stairNorth)) {
        if (value.column == col + 1) {
            tiles.setTileAt(value, sprites.dungeon.floorDarkDiamond)
            tiles.setWallAt(value, false)
            music.spooky.play()
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (mySprite.overlapsWith(Portal1)) {
        jumpToPortal(Portal2, sprite)
    } else if (mySprite.overlapsWith(Portal3)) {
        jumpToPortal(Portal4, sprite)
    } else if (mySprite.overlapsWith(Portal5)) {
        jumpToPortal(Portal6, sprite)
    } else {
    	
    }
})
function level6 () {
    binTeeth()
    makePortals()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 6
    tiles.setTilemap(tilemap`Level6`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 5))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(14, 11))
    for (let value of sprites.allOfKind(SpriteKind.Portal)) {
        value.destroy()
    }
    game.splash("Be careful!", "Only walk on the diamonds")
}
function level5 () {
    binTeeth()
    makePortals()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 5
    tiles.setTilemap(tilemap`level13`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
    tiles.placeOnTile(Portal1, tiles.getTileLocation(13, 2))
    tiles.placeOnTile(Portal2, tiles.getTileLocation(13, 7))
    tiles.placeOnTile(Portal3, tiles.getTileLocation(2, 7))
    tiles.placeOnTile(Portal4, tiles.getTileLocation(8, 10))
    tiles.placeOnTile(Portal5, tiles.getTileLocation(14, 11))
    tiles.placeOnTile(Portal6, tiles.getTileLocation(2, 3))
    Teeth1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth1, tiles.getTileLocation(4, 3))
    Teeth2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth2, tiles.getTileLocation(5, 14))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(8, 14))
    bossHealth = 6
    bossIsRed = false
    theBoss = sprites.create(assets.image`boss1`, SpriteKind.Boss)
    tiles.placeOnTile(theBoss, tiles.getTileLocation(8, 8))
    tiles.setWallAt(tiles.getTileLocation(1, 12), true)
    placeHouse2(9, 3)
}
function jumpToPortal (Portal: Sprite, sprite: Sprite) {
    music.magicWand.play()
    sprite.setPosition(Portal.x, Portal.y)
}
function lockGates (row: number, col: number) {
    for (let value of tiles.getTilesByType(sprites.dungeon.floorDarkDiamond)) {
        tiles.setTileAt(value, sprites.dungeon.stairNorth)
        tiles.setWallAt(value, true)
        music.spooky.play()
        if (value.column == col + 1) {
        	
        }
    }
}
function level3 () {
    binTeeth()
    makePortals()
    Portal5.destroy()
    Portal6.destroy()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 3
    tiles.setTilemap(tilemap`level7`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 2))
    tiles.placeOnTile(Portal1, tiles.getTileLocation(9, 2))
    tiles.placeOnTile(Portal2, tiles.getTileLocation(14, 7))
    tiles.placeOnTile(Portal3, tiles.getTileLocation(1, 9))
    Teeth1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth1, tiles.getTileLocation(5, 2))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(13, 3))
    tiles.placeOnTile(Portal4, tiles.getTileLocation(13, 3))
    sawSprite = sprites.create(assets.image`myImage9`, SpriteKind.Saw)
    tiles.placeOnTile(sawSprite, tiles.getTileLocation(7, 12))
    sawSprite.setVelocity(75, 0)
}
function die () {
    mySprite.destroy(effects.spray, 500)
    info.changeLifeBy(-1)
    music.wawawawaa.playUntilDone()
    pause(2000)
    if (Level == 2) {
        level2()
    } else if (Level == 3) {
        level3()
    } else if (Level == 4) {
        level4()
    } else if (Level == 5) {
        level5()
    } else if (Level == 6) {
        level6()
    } else if (Level == 7) {
        level7()
    } else {
        level1()
    }
}
function winLevel () {
    mySprite.destroy()
    music.baDing.play()
    effects.confetti.startScreenEffect()
    pause(2000)
    effects.confetti.endScreenEffect()
    Level += 1
    if (Level == 2) {
        level2()
    } else if (Level == 3) {
        level3()
    } else if (Level == 4) {
        level4()
    } else if (Level == 5) {
        level5()
    } else if (Level == 6) {
        game.splash("Well done", "You gained an extra heart!")
        info.changeLifeBy(1)
        level6()
    } else if (Level == 7) {
        level7()
    } else {
        game.over(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.House, function (sprite, otherSprite) {
    otherSprite.setVelocity(sprite.vx, sprite.vy)
})
function level2 () {
    makePortals()
    Portal5.destroy()
    Portal6.destroy()
    mySprite = sprites.create(assets.image`myImage2`, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    Level = 2
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
    tiles.placeOnTile(Portal1, tiles.getTileLocation(14, 3))
    tiles.placeOnTile(Portal2, tiles.getTileLocation(10, 5))
    tiles.placeOnTile(Ending2, tiles.getTileLocation(12, 8))
    Portal3.destroy()
    Portal4.destroy()
    Teeth1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth1, tiles.getTileLocation(5, 3))
    Teeth2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth2, tiles.getTileLocation(8, 3))
    Teeth3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth3, tiles.getTileLocation(9, 6))
    Teeth4 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth4, tiles.getTileLocation(9, 14))
    Teeth5 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Teeth)
    tiles.placeOnTile(Teeth5, tiles.getTileLocation(12, 14))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.beamUp.play()
    hasKey = true
    game.splash("You found a key!")
    keysHeld += 1
})
scene.onHitWall(SpriteKind.Net, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    unlockDoor(location.row, location.column)
    isOnSwitch = true
})
function fireNet (dx: number, dy: number, camera: Sprite) {
    projectile = sprites.createProjectileFromSprite(assets.image`myImage11`, camera, dx / playerDistance * 100, dy / playerDistance * 100)
    projectile.setKind(SpriteKind.Net)
    animation.runImageAnimation(
    projectile,
    assets.animation`myAnim1`,
    100,
    false
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ending, function (sprite, otherSprite) {
    winLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Saw, function (sprite, otherSprite) {
    die()
})
scene.onHitWall(SpriteKind.Saw, function (sprite, location) {
    sprite.vx = sprite.vx * -1
    if (sprite.vx >= 0) {
        sprite.setImage(assets.image`myImage9`)
    } else {
        sprite.setImage(assets.image`myImage10`)
    }
    music.pewPew.play()
})
function placeHouse2 (x: number, y: number) {
    house = sprites.create(assets.image`house1`, SpriteKind.House)
    house.setBounceOnWall(true)
    tiles.placeOnTile(house, tiles.getTileLocation(x, y))
    house.fx = 500
    house.fy = 500
}
info.onLifeZero(function () {
    game.over(false)
})
sprites.onOverlap(SpriteKind.House, SpriteKind.Portal, function (sprite, otherSprite) {
    if (sprite.overlapsWith(Portal1)) {
        jumpToPortal(Portal2, sprite)
    } else if (sprite.overlapsWith(Portal3)) {
        jumpToPortal(Portal4, sprite)
    } else if (sprite.overlapsWith(Portal5)) {
        jumpToPortal(Portal6, sprite)
    } else {
    	
    }
})
function level7 () {
    Level = 7
    tiles.setTilemap(tilemap`level17`)
    configureLevel()
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, sprites.builtin.forestTiles0)
    buttonIndex = location.column - 23
    sequenceLength += 1
    if (sequenceLength == 1 && buttonIndex == 4) {
        music.jumpUp.play()
    } else if (sequenceLength == 2 && buttonIndex == 1) {
        music.jumpUp.play()
    } else if (sequenceLength == 3 && buttonIndex == 2) {
        music.jumpUp.play()
    } else if (sequenceLength == 4 && buttonIndex == 3) {
        music.jumpUp.play()
    } else if (sequenceLength == 5 && buttonIndex == 5) {
        music.jumpUp.play()
        unlockDoor(location.row, location.column - 7)
    } else {
        music.jumpDown.playUntilDone()
        sequenceLength = 0
        for (let value of tiles.getTilesByType(sprites.builtin.forestTiles0)) {
            if (value.row == location.row) {
                tiles.setTileAt(value, sprites.dungeon.collectibleRedCrystal)
            }
        }
    }
})
function makePortals () {
    for (let value7 of sprites.allOfKind(SpriteKind.Portal)) {
        value7.destroy()
    }
    Portal1 = sprites.create(assets.image`myImage1`, SpriteKind.Portal)
    Portal2 = sprites.create(assets.image`myImage5`, SpriteKind.Portal)
    Portal3 = sprites.create(assets.image`myImage1`, SpriteKind.Portal)
    Portal4 = sprites.create(assets.image`myImage5`, SpriteKind.Portal)
    Portal5 = sprites.create(assets.image`myImage1`, SpriteKind.Portal)
    Portal6 = sprites.create(assets.image`myImage5`, SpriteKind.Portal)
    Ending2 = sprites.create(assets.image`myImage4`, SpriteKind.Ending)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teeth, function (sprite, otherSprite) {
    die()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (bossIsRed) {
        die()
    }
})
let Hasteeth = 0
let canSee = 0
let dy = 0
let dx = 0
let sequenceLength = 0
let buttonIndex = 0
let house: Sprite = null
let playerDistance = 0
let projectile: Sprite = null
let isOnSwitch = false
let Teeth5: Sprite = null
let Teeth4: Sprite = null
let Teeth3: Sprite = null
let theBoss: Sprite = null
let Teeth2: Sprite = null
let camera1: Sprite = null
let bossHealth = 0
let bossIsRed = false
let Portal6: Sprite = null
let Portal5: Sprite = null
let Portal4: Sprite = null
let Portal3: Sprite = null
let sawSprite: Sprite = null
let Teeth1: Sprite = null
let Portal2: Sprite = null
let Portal1: Sprite = null
let Level = 0
let key: Sprite = null
let Ending2: Sprite = null
let mySprite: Sprite = null
let hasKey = false
let keysHeld = 0
game.splash("Welcome to \"Scary Maze\"!", "Beware each level's unique challenges!")
info.setLife(3)
level1()
game.onUpdate(function () {
    if (Level == 6) {
        if (tiles.tileImageAtLocation(mySprite.tilemapLocation()) != tiles.tileImageAtLocation(tiles.getTileLocation(1, 5))) {
            die()
        }
    }
})
game.onUpdateInterval(5000, function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Boss)) {
        bossIsRed = !(bossIsRed)
        if (bossIsRed) {
            if (bossHealth > 0) {
                music.siren.loop()
            }
            if (bossHealth > 3) {
                value8.setImage(assets.image`boss_red`)
            } else {
                value8.setImage(assets.image`boss1_one_red`)
            }
        } else {
            music.siren.stop()
            if (bossHealth > 3) {
                value8.setImage(assets.image`boss1`)
            } else {
                value8.setImage(assets.image`boss1_one`)
            }
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Boss)) {
        if (bossIsRed) {
            value8.follow(mySprite, 16)
        } else {
            value8.follow(mySprite, 0)
            if (mySprite.x > value8.x + 0) {
                dx = 1
            } else if (mySprite.x < value8.x - 0) {
                dx = -1
            } else {
                dx = 0
            }
            if (mySprite.y > value8.y + 0) {
                dy = 1
            } else if (mySprite.y < value8.y - 0) {
                dy = -1
            } else {
                dy = 0
            }
            value8.setVelocity(dx * -15, dy * -15)
        }
    }
})
game.onUpdateInterval(500, function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Camera)) {
        value9.fx += 1
        if (value9.fx >= 8) {
            value9.fx = 0
        }
        if (value9.fx == 0) {
            value9.setImage(assets.image`Camera1`)
        } else if (value9.fx == 1) {
            value9.setImage(assets.image`Camera2`)
        } else if (value9.fx == 2) {
            value9.setImage(assets.image`Camera3`)
        } else if (value9.fx == 3) {
            value9.setImage(assets.image`Camera4`)
        } else if (value9.fx == 4) {
            value9.setImage(assets.image`Camera5`)
        } else if (value9.fx == 5) {
            value9.setImage(assets.image`Camera6`)
        } else if (value9.fx == 6) {
            value9.setImage(assets.image`Camera7`)
        } else {
            value9.setImage(assets.image`Camera8`)
        }
    }
})
game.onUpdateInterval(500, function () {
    for (let value10 of sprites.allOfKind(SpriteKind.Camera)) {
        dx = mySprite.x - value10.x
        dy = mySprite.y - value10.y
        playerDistance = Math.sqrt(dx ** 2 + dy ** 2)
        if (playerDistance < 75) {
            canSee = 0
            if (value10.fx == 0) {
                if (dx > 0 && Math.abs(dy) < dx) {
                    canSee = 1
                }
            } else if (value10.fx == 1) {
                if (dx > 0 && dy > 0) {
                    canSee = 1
                }
            } else if (value10.fx == 2) {
                if (dy > 0 && Math.abs(dx) < dy) {
                    canSee = 1
                }
            } else if (value10.fx == 3) {
                if (dx < 0 && dy > 0) {
                    canSee = 1
                }
            } else if (value10.fx == 4) {
                if (dx < 0 && Math.abs(dy) < Math.abs(dx)) {
                    canSee = 1
                }
            } else if (value10.fx == 5) {
                if (dx < 0 && dy < 0) {
                    canSee = 1
                }
            } else if (value10.fx == 6) {
                if (dy < 0 && Math.abs(dx) < Math.abs(dy)) {
                    canSee = 1
                }
            } else {
                if (dx > 0 && dy < 0) {
                    canSee = 1
                }
            }
            if (canSee) {
                fireNet(dx, dy, value10)
            }
        }
    }
    if (isOnSwitch) {
        if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), sprites.dungeon.collectibleBlueCrystal)) {
        	
        } else {
            isOnSwitch = false
            lockGates(1, 1)
        }
    }
})
game.onUpdateInterval(3000, function () {
    Hasteeth = 0
    for (let value11 of sprites.allOfKind(SpriteKind.Teeth)) {
        animation.runImageAnimation(
        value11,
        assets.animation`myAnim`,
        100,
        false
        )
        Hasteeth = 1
    }
    if (Hasteeth == 1) {
        music.knock.play()
    }
})
