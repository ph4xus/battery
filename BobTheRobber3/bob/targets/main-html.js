/** Cooked with Flambe, https://getflambe.com */
'use strict';
(function() {
	function q(a, b) {
		function c() {}
		c.prototype = a;
		var h = new c,
			d;
		for (d in b) h[d] = b[d];
		b.toString !== Object.prototype.toString && (h.toString = b.toString);
		return h
	}

	function od(a) {
		return a instanceof Array ? function() {
			return r.iter(a)
		} : "function" == typeof a.iterator ? Ka(a, a.iterator) : a.iterator
	}

	function Ka(a, b) {
		if (null == b) return null;
		null == b.__id__ && (b.__id__ = sd++);
		var c;
		null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
		null == c && (c = function() {
			return c.method.apply(c.scope,
				arguments)
		}, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
		return c
	}
	var f = {},
		j = function() {
			return I.__string_rec(this, "")
		},
		ca = function() {};
	f["flambe.util.Disposable"] = ca;
	ca.__name__ = ["flambe", "util", "Disposable"];
	ca.prototype = {
		__class__: ca
	};
	var n = function() {
		this._flags = 0;
		this.owner = this.next = null
	};
	f["flambe.Component"] = n;
	n.__name__ = ["flambe", "Component"];
	n.__interfaces__ = [ca];
	n.prototype = {
		onAdded: function() {},
		onRemoved: function() {},
		onStart: function() {},
		onStop: function() {},
		onUpdate: function() {},
		dispose: function() {
			null != this.owner && this.owner.remove(this)
		},
		get_name: function() {
			return null
		},
		__class__: n
	};
	var gb = function(a, b, c, h) {
		this._idleTimer = this._movieTimer = 0;
		this._bobIdle = !1;
		this._timerStop = 0.1;
		this._timer = 0;
		this._currentEnemy = null;
		this._bobMoveElevator = this._bobGoToElevator = this._bobGoToStair = this._bobGoToSave = this._bobInShadow = this._bobBusy = this._isNearEnemyBody = this._isNearStair = !1;
		this.currentPadlock = null;
		var d = this;
		this.currentAction = "stay";
		this._ctx = a;
		this._name = b;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this.destroyed = new T;
		this._steps = this._ctx.pack.getSound("sounds/bob_footsteps");
		this.bobWalking = !1;
		this._ctx.currentLevel.paused.watch(function(a) {
			a ? d.bobWalking && d._bobSteps.volume.set__(0) : d.bobWalking && d._bobSteps.volume.set__(1)
		})
	};
	f.BobHero = gb;
	gb.__name__ = ["BobHero"];
	gb.__super__ = n;
	gb.prototype = q(n.prototype, {
		get_name: function() {
			return "BobHero_33"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "bobAnim");
			this._moviePlayer = new J(a);
			this.IdleBob();
			this.owner.add(this._moviePlayer);
			this.bobSprite = new m;
			this.owner.add(this.bobSprite);
			this.bobSprite.setScale(this._ctx.gameScale);
			this.bobSprite.setXY(this._x, this._y);
			this.movePointX = this._x;
			this.movePointY = this._y;
			this._movieTimer = 0
		},
		onUpdate: function(a) {
			this._x = this.owner._compMap.Sprite_0.x._value;
			this._y = this.owner._compMap.Sprite_0.y._value;
			this._bobMoveElevator && (this._timer += a, this._timer >= this._timerStop && (this._timer = 0, this._bobMoveElevator = !1));
			"stay" == this.currentAction && (this._idleTimer += a, 4 <= this._idleTimer && (this._idleTimer =
				0, 0.6 < Math.random() ? this.bobSprite.scaleX.set__(-1 * Math.abs(this.bobSprite.scaleX._value)) : this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)), this.currentAction = "idle1", this._moviePlayer.loop("_Idle1", !1), this._ctx.pack.getSound("sounds/bob_looks_around").play(1)));
			"idle1" == this.currentAction && (this._timer += a, 1.5 <= this._timer && (this._timer = 0, this.IdleBob()));
			"idleShadow" == this.currentAction && (this._idleTimer += a, 4 <= this._idleTimer && (this._idleTimer = 0, 0.6 < Math.random() ? (this.bobSprite.scaleX.set__(-1 *
				Math.abs(this.bobSprite.scaleX._value)), this._ctx.currentLevel.bobGlass.scaleX.set__(-1 * Math.abs(this.bobSprite.scaleX._value))) : (this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)), this._ctx.currentLevel.bobGlass.scaleX.set__(Math.abs(this.bobSprite.scaleX._value))), this.currentAction = "_IdleShadow1", this._moviePlayer.loop("_IdleShadow1", !0), this._ctx.currentLevel.moviePlayer.loop("_IdleShadowGlass1", !0), this._ctx.pack.getSound("sounds/bob_looks_around").play(1)));
			"_IdleShadow1" ==
			this.currentAction && (this._timer += a, 1.5 <= this._timer && (this._timer = 0, this.changeAction("idleShadow")));
			if ("hit" == this.currentAction || "shock" == this.currentAction) this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.IdleBob(), this._ctx.currentLevel._screensLayer.removeChild(this.owner), this._ctx.currentLevel._charactersLayer.addChild(this.owner), this._bobGoToStair = !1);
			if ("setbox" == this.currentAction || "setboxGostair" == this.currentAction) this._movieTimer += a, this._movieTimer >=
				this._movieTimerStop && ("GuardA" == this._enemyNameCover && this._currentEnemy._compMap.GuardA_28.CoverTheBox(), "GuardB" == this._enemyNameCover && this._currentEnemy._compMap.GuardB_27.CoverTheBox(), "Scientist" == this._enemyNameCover && this._currentEnemy._compMap.Scientist_26.CoverTheBox(), this._bobGoToStair = !1, this._movieTimer = 0, "setbox" == this.currentAction ? (this._bobBusy = this._isNearEnemyBody = !1, this.IdleBob()) : "setboxGostair" == this.currentAction && (this._ctx.currentLevel.FindStairToTeleport(this._stairGroupId),
					this.changeAction(this._stairName, this._stairX, this.bobSprite.y._value)));
			"liftIn" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.owner.remove(this._moviePlayer), this._moviePlayer.dispose(), this.IdleBob(), this._ctx.pack.getSound("sounds/elevator_button").play(1), this.currentPadlock._compMap.Elevator_14.bobInLift()));
			"liftOut" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._bobGoToElevator =
				this._bobInShadow = !1, this.IdleBob()));
			"beginLevel" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.currentPadlock._compMap.StartDoor_7.closeDoor(), this.IdleBob(), this._ctx.currentLevel.ActivateControl()));
			if ("StairUp" == this.currentAction || "StairDown" == this.currentAction) this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._ctx.currentLevel.TeleportBobToStair(this.currentAction), "StairUp" == this.currentAction ?
				(this.currentAction = "stairOutUp", this._ctx.currentLevel._backgroundLayer.removeChild(this.owner), this._ctx.currentLevel._charactersLayer.addChild(this.owner)) : this.currentAction = "stairOutDown", this._moviePlayer.loop("_StairOut", !0));
			if ("stairOutUp" == this.currentAction || "stairOutDown" == this.currentAction) this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, "stairOutDown" == this.currentAction && (this._bobInShadow = !1, this._ctx.currentLevel._backgroundLayer.removeChild(this.owner),
				this._ctx.currentLevel._charactersLayer.addChild(this.owner)), this._isNearStair = this._isNearEnemyBody = this._bobInShadow = !1, this.IdleBob(), this._bobBusy = this._bobGoToStair = !1);
			"shadowIn" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.changeAction("idleShadow"), this._bobInShadow = !0));
			"shadowOut" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.IdleBob(), this._bobInShadow = !1));
			"inSave" ==
			this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._movieTimerStop = 1.2, this._ctx.isLevelPointSaved = !0, this._ctx.copyTempToSave(), this.currentAction = "save", this._moviePlayer.loop("_Save", !1), this._ctx.batteriesInLevel = this._ctx.currentLevel.batery._value, this._ctx.currentLevel.saveDoorCodes()));
			"save" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._movieTimerStop = 0.4, this.currentAction =
				"outSave", this._moviePlayer.loop("_OutSave", !0), this.currentPadlock._compMap.ChargeBase_6.OutSavePoint()));
			"outSave" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._bobGoToSave = this._bobGoToStair = !1, this.IdleBob()));
			"yes" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.currentAction = "toNextLevel", this._moviePlayer.loop("_LiftIn"), this._movieTimerStop = 0.9, this._ctx.currentLevel._charactersLayer.removeChild(this.owner),
				this._ctx.currentLevel._backgroundLayer.addChild(this.owner)));
			"yes2" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.IdleBob()));
			"partIn" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, loaderHelper.show(), this.owner.remove(this._moviePlayer), this._moviePlayer.dispose(), this.currentPadlock._compMap.PartDoor_16.closeDoor(), this.IdleBob()));
			"partOut" == this.currentAction && (this._movieTimer +=
				a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.currentPadlock._compMap.PartDoor_16.closeDoorOut(), this.IdleBob()));
			"toNextLevel" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.currentPadlock._compMap.FinishDoor_38.closeDoor(), this.IdleBob(), this.currentAction = "win"));
			"fear" == this.currentAction && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.currentAction = "gameover", this._ctx.currentLevel.score.set__(0)))
		},
		changeAction: function(a, b, c, h) {
			null == h && (h = "left");
			null == c && (c = 0);
			null == b && (b = 0);
			this._ctx.currentLevel.bobGlass.set_visible(!1);
			this._ctx.currentLevel.moviePlayer.loop("_Walk", !1);
			b -= this._ctx.centerCoefX;
			"move" == a && (this.currentAction = a, "right" == h ? this.bobSprite.scaleX.set__(-1 * Math.abs(this.bobSprite.scaleX._value)) : this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)), this.bobWalking || (this._bobSteps = this._steps.loop(1), this.bobWalking = !0));
			b += this._ctx.centerCoefX;
			"stay" == a && (this.currentAction =
				a);
			"move" == this.currentAction && !this._bobInShadow ? this._moviePlayer.loop("_Walk", !1) : this._bobInShadow && (this.currentAction = "shadowOut", this._movieTimerStop = 0.1);
			"stay" == this.currentAction && this.IdleBob();
			"hit" == a && !this._bobGoToStair && (this.IdleBob(), this.currentAction = a, this._moviePlayer.loop("_Hit", !0), this._movieTimerStop = 0.5, this._ctx.pack.getSound("sounds/bob_punch_var").play(1), this._ctx.currentLevel._charactersLayer.removeChild(this.owner), this._ctx.currentLevel._screensLayer.addChild(this.owner),
				this._bobGoToStair = !0);
			"shock" == a && !this._bobGoToStair && (this.IdleBob(), this.currentAction = a, this._moviePlayer.loop("_Shocker", !0), this._movieTimerStop = 0.5, this._ctx.currentLevel._charactersLayer.removeChild(this.owner), this._ctx.currentLevel._screensLayer.addChild(this.owner), this._ctx.pack.getSound("sounds/electro_shocker").play(), this._bobGoToStair = !0);
			"setbox" == a && !this._bobGoToStair && !this._bobBusy && (this._bobGoToStair = !0, this.currentAction = a, this._moviePlayer.loop("_DropBox", !0), this._movieTimerStop =
				0.7, this._ctx.pack.getSound("sounds/box_cover").play(1), this._bobBusy = !0);
			"setboxGostair" == a && !this._bobGoToStair && !this._bobBusy && (this.currentAction = a, this._moviePlayer.loop("_DropBox", !0), this._movieTimerStop = 0.7, this._ctx.pack.getSound("sounds/box_cover").play(1), this._bobBusy = !0);
			"liftIn" == a && "liftIn" != this.currentAction && (this.currentAction = a, this._moviePlayer.loop("_LiftIn"), this._bobInShadow = !0, this._moviePlayer.movie._value.set_position(0), this._movieTimer = 0, this._movieTimerStop = 0.93, this.bobSprite.setXY(b,
				c), this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)));
			"liftOut" == a && "liftOut" != this.currentAction && (this.currentAction = a, h = new M(this._ctx.pack, "bobAnim"), this._moviePlayer = new J(h), this.owner.add(this._moviePlayer), this._moviePlayer.loop("_LiftOut"), this._movieTimer = 0, this._movieTimerStop = 0.55, this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)));
			"beginLevel" == a && (loaderHelper.hide(), this.currentAction = a, this._moviePlayer.loop("_LiftOut"), this._movieTimerStop = 0.55,
				this.bobSprite.setXY(b, c), this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)));
			"partOut" == a && (this.currentAction = a, h = new M(this._ctx.pack, "bobAnim"), this._moviePlayer = new J(h), this.owner.add(this._moviePlayer), this._moviePlayer.loop("_LiftOut"), this._movieTimerStop = 0.55, this.bobSprite.setXY(b, c), this.bobSprite.scaleX.set__(Math.abs(this.bobSprite.scaleX._value)), this._bobInShadow = !1, this._ctx.currentLevel._backgroundLayer.removeChild(this.owner), this._ctx.currentLevel._charactersLayer.addChild(this.owner));
			"StairUp" == a && (this._bobBusy = this._bobGoToStair = !0, this.currentAction = a, this._moviePlayer.loop("_StairIn", !0), this._movieTimerStop = 0.5, this.bobSprite.setXY(b, c), this.bobSprite.y.animate(c, c + 25 * this._ctx.currentScaleCoef, 0.5, l.linear), this._ctx.currentLevel._charactersLayer.removeChild(this.owner), this._ctx.currentLevel._backgroundLayer.addChild(this.owner), this._bobSteps.dispose(), this._bobInShadow = !0);
			"StairDown" == a && (this._bobBusy = this._bobGoToStair = !0, this.currentAction = a, this._moviePlayer.loop("_StairIn",
				!0), this._movieTimerStop = 0.4, this.bobSprite.setXY(b, c), this.bobSprite.y.animate(c, c - 25 * this._ctx.currentScaleCoef, 0.4, l.linear), this._ctx.currentLevel._charactersLayer.removeChild(this.owner), this._ctx.currentLevel._backgroundLayer.addChild(this.owner), this._bobSteps.dispose(), this._bobInShadow = !0);
			"shadowIn" == a && "stay" == this.currentAction && (this.currentAction = a, this._moviePlayer.loop("_InShadow", !1), this._movieTimerStop = 0.3, this._bobInShadow = !0, this._ctx.pack.getSound("sounds/bob_shadow").play(1));
			"idleShadow" == a && (this.currentAction = a, this.owner.remove(this._moviePlayer), this._moviePlayer.dispose(), h = new M(this._ctx.pack, "bobAnim"), this._moviePlayer = new J(h), this.owner.add(this._moviePlayer), this._moviePlayer.loop("_IdleShadow", !0), this._ctx.currentLevel.glassEntiry.remove(this._ctx.currentLevel.moviePlayer), this._ctx.currentLevel.moviePlayer.dispose(), h = new M(this._ctx.pack, "bobAnim"), this._ctx.currentLevel.moviePlayer = new J(h), this._ctx.currentLevel.glassEntiry.add(this._ctx.currentLevel.moviePlayer),
				this._ctx.currentLevel.bobGlass.setXY(this._x, this._y), this._ctx.currentLevel.bobGlass.set_visible(!0), this._ctx.currentLevel.moviePlayer.loop("_IdleShadowGlass", !0));
			"save" == a && (this.currentAction = a, this._movieTimerStop = 1.2, this._moviePlayer.loop("_Save", !1), this.bobSprite.setXY(b, c));
			"inSave" == a && (this._bobGoToStair = !0, this.currentAction = a, this._moviePlayer.loop("_InSave", !0), this._movieTimerStop = 0.4, this.bobSprite.setXY(b, c), this.currentPadlock._compMap.ChargeBase_6.GotoSavePoint(), this._ctx.pack.getSound("sounds/scaner").play(1));
			if ("yes" == a || "yes2" == a) this.currentAction = a, this._moviePlayer.loop("_Yes", !0), this._movieTimerStop = 0.9, this.bobSprite.setXY(b, c), this._bobSteps.dispose(), this._ctx.pack.getSound("sounds/bob_level_complete_var").play(1);
			"partIn" == a && (this._movieTimer = 0, this.currentAction = "partIn", this._moviePlayer.loop("_LiftIn"), this._movieTimerStop = 0.9, this.bobSprite.setXY(b, c), this._bobInShadow = !0, this._ctx.currentLevel._charactersLayer.removeChild(this.owner), this._ctx.currentLevel._backgroundLayer.addChild(this.owner));
			"fear" == a && (this.currentAction = a, this._moviePlayer.loop("_Fear", !0), this._movieTimerStop = 2, this._movieTimer = 0, this._bobSteps.dispose(), this._ctx.pack.getSound("sounds/bob_busted").play(1))
		},
		IdleBob: function() {
			this.bobWalking && (this.bobWalking = !1, this._bobSteps.dispose());
			this._bobIdle = !0;
			this._idleTimer = 0;
			this.currentAction = "stay";
			this._moviePlayer.loop("_Idle", !1);
			this._moviePlayer.movie._value.set_position(0)
		},
		getY: function() {
			return this.bobSprite.y._value
		},
		removePlayer: function() {
			this.bobWalking &&
				this._bobSteps.dispose()
		},
		__class__: gb
	});
	var hb = function(a) {
		this.rotateCoef = 0;
		this.direction = "left";
		this._ctx = a
	};
	f.BobMenu = hb;
	hb.__name__ = ["BobMenu"];
	hb.__super__ = n;
	hb.prototype = q(n.prototype, {
		get_name: function() {
			return "BobMenu_34"
		},
		onAdded: function() {
			this._spriteBob = new g(this._ctx.pack.getTexture("bobRopeJump"));
			this.owner.add(this._spriteBob);
			this._spriteBob.setXY(0.6 * k._platform.getStage().get_width(), 0.05 * k._platform.getStage().get_height());
			this._spriteBob.setAnchor(259, 0)
		},
		onUpdate: function() {
			if ("left" ==
				this.direction) {
				var a = this._spriteBob.rotation;
				a.set__(a._value - 0.03);
				this.rotateCoef += 1
			}
			"right" == this.direction && (a = this._spriteBob.rotation, a.set__(a._value + 0.03), this.rotateCoef += 1);
			160 <= this.rotateCoef && (this.direction = "left" == this.direction ? "right" : "left", this.rotateCoef = 0)
		},
		__class__: hb
	});
	var ib = function(a, b, c, h, d) {
		this._isBalloonShow = this._firstShowScreen = this._isUsed = !1;
		this._ctx = b;
		this._stairName = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this._saveCabinId = d
	};
	f.ChargeBase =
		ib;
	ib.__name__ = ["ChargeBase"];
	ib.__super__ = n;
	ib.prototype = q(n.prototype, {
		get_name: function() {
			return "ChargeBase_6"
		},
		onAdded: function() {
			var a;
			a = this._ctx.pack.getTexture("gameObjects/SavePoint");
			this._spriteDoor = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spriteDoor && this.owner.add(this._spriteDoor = new g(a));
			this._spriteDoor.texture = a;
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor();
			this._light = new g(this._ctx.pack.getTexture("gameObjects/SavePointLight"));
			this._light.setScale(this._ctx.gameScale);
			this._light.setXY(this._x + 3 * this._ctx.currentScaleCoef, this._y);
			this._light.centerAnchor();
			this._topActive = new g(this._ctx.pack.getTexture("gameObjects/SavePointTop"));
			this._topActive.setScale(this._ctx.gameScale);
			this._topActive.setXY(this._x + 4 * this._ctx.currentScaleCoef, this._y - 33 * this._ctx.currentScaleCoef);
			this._topActive.centerAnchor();
			this._light.set_visible(!1);
			this._topActive.set_visible(!1);
			this.light = (new e).add(this._light);
			this._ctx.currentLevel._screensLayer.addChild(this.light);
			this.top = (new e).add(this._topActive);
			this._ctx.currentLevel._lightsLayer.addChild(this.top)
		},
		onUpdate: function() {
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction ? (this._ctx.currentLevel.isPlayerTryAction = !1, 8 == this._ctx.currentLevelNumber &&
				2 == this._ctx.currentLevelPart && 1 == this._ctx.currentLevel.tutor.tipsActivate[9] && this._ctx.currentLevel.tutor.closeTip(10), this.ShowSaveMessage()) : this._ctx.currentLevel.downKey && (this._ctx.currentLevel.downKey = !1, 8 == this._ctx.currentLevelNumber && 2 == this._ctx.currentLevelPart && 1 == this._ctx.currentLevel.tutor.tipsActivate[9] && this._ctx.currentLevel.tutor.closeTip(10), this.ShowSaveMessage()));
			this.isStairFind = !1;
			if (Math.abs(this._spriteDoor.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) <
				15 * this._ctx.currentScaleCoef && Math.abs(this._spriteDoor.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToSave && !this._isUsed && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				1 == this._ctx.currentLevelNumber && this._ctx.currentLevel.tutor.showTip(6);
				this._ctx.currentLevel._currentStairNumber = this.groupID;
				var a = new g(this._ctx.pack.getTexture("BalloonSave"));
				this._currentBalloon = (new e).add(a);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				a.setScale(this._ctx.gameScale);
				a.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				this._topActive.set_visible(!0)
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isUsed || this._topActive.set_visible(!1), 1 == this._ctx.currentLevelNumber && this._ctx.currentLevel.tutor.closeTip(6),
				this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		ShowSaveMessage: function() {
			this._topActive.set_visible(!0);
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner;
			this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToSave = !0;
			this._ctx.saveCabinNumber = this._saveCabinId;
			this._ctx.levelTimerSave = this._ctx.currentLevel.watch._value;
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("inSave", this._x + 2 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value);
			1 == this._ctx.currentLevelNumber && this._ctx.currentLevel.tutor.closeTip(6);
			null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon),
				this._currentBalloon.dispose())
		},
		GotoSavePoint: function() {
			this._isUsed = this._firstShowScreen = !0;
			this._ctx.currentLevel._lightsLayer.removeChild(this.top);
			this._ctx.currentLevel._screensLayer.addChild(this.top);
			this._light.set_visible(!0);
			this._topActive.set_visible(!0);
			this._spriteDoor.texture = this._ctx.pack.getTexture("gameObjects/SavePointActive")
		},
		CloseSaveMessage: function() {},
		OutSavePoint: function() {
			this._ctx.currentLevel._screensLayer.removeChild(this.top);
			this._ctx.currentLevel._objectsLayer.addChild(this.top);
			this._light.set_visible(!1)
		},
		getX: function() {
			return this._x + 4 * this._ctx.currentScaleCoef
		},
		getY: function() {
			return this._y
		},
		__class__: ib
	});
	var jb = function(a, b, c, h, d, s) {
		this.isUsed = this._isBalloonShow = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this.doorName = h;
		this._passcode = d;
		this._objId = s;
		this.seeIt = !1
	};
	f.Codepad = jb;
	jb.__name__ = ["Codepad"];
	jb.__super__ = n;
	jb.prototype = q(n.prototype, {
		get_name: function() {
			return "Codepad_10"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("gameObjects/codepanel");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock && this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x, this._y);
			this._spritePadlock.centerAnchor();
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart &&
					(this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this._objId == this.objectsForSave[a].eId) {
						this.deactivatePad();
						break
					}++a
				}
			}
		},
		onUpdate: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction &&
				(this._ctx.currentLevel.isPlayerTryAction = !1, 2 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[7] && this._ctx.currentLevel.tutor.closeTip(8), 4 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[8] && this._ctx.currentLevel.tutor.closeTip(9), this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showCodePanel(this.doorName,
					this._passcode), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = this._currentBalloon));
			this.isStairFind = !1;
			if (Math.abs(this._spritePadlock.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spritePadlock.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.isGameEnd &&
				(this.isStairFind = !0, !1 == this._isBalloonShow && !this.isUsed)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonCode"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 10 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					2 == a._ctx.currentLevelNumber &&
						1 == a._ctx.currentLevel.tutor.tipsActivate[7] && a._ctx.currentLevel.tutor.closeTip(8);
					4 == a._ctx.currentLevelNumber && 1 == a._ctx.currentLevel.tutor.tipsActivate[8] && a._ctx.currentLevel.tutor.closeTip(9);
					a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", a._ctx.currentLevel.player._compMap.Sprite_0.x._value, a._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					a._ctx.currentLevel.showCodePanel(a.doorName, a._passcode);
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = a._currentBalloon
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		removeBallon: function() {
			null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		getPass: function() {
			return this._passcode
		},
		deactivatePad: function() {
			this.isUsed = !0;
			this._ctx.currentLevel.FindAndOpenDoor(this.doorName)
		},
		CodePadDone: function() {
			this._ctx.addObjectsToSave(new Q(this._objId));
			this.deactivatePad()
		},
		__class__: jb
	});
	var La = function(a, b, c) {
		this._factorY = 0.8;
		this._factorX = 0.4;
		this._speedX = this._speedY = 0;
		this._isRight = !0;
		this._ctx = a;
		this._x = b;
		this._y = c;
		this._speedX = (30 * Math.random() - 15) * a.gameScale;
		this._speedY = -((20 * Math.random() + 10) * a.gameScale);
		this._factorX *= a.gameScale;
		this._factorY *= a.gameScale
	};
	f.Coin = La;
	La.__name__ = ["Coin"];
	La.__super__ = n;
	La.prototype =
		q(n.prototype, {
			get_name: function() {
				return "Coin_36"
			},
			onAdded: function() {
				var a = this,
					b = new M(this._ctx.pack, "effectsAnim");
				this._moviePlayer = new J(b);
				this.owner.add(this._moviePlayer);
				this._coin = new m;
				this.owner.add(this._coin);
				this._coin.setScale(this._ctx.gameScale);
				this._coin.setXY(this._x, this._y);
				this._coin.centerAnchor();
				this._moviePlayer.loop("_CoinRotate", !0);
				this.uiSpriteScript = new la;
				this.uiSpriteScript.run(new ma(new na([new oa(0.01), new pa(function() {
					a.coinMove()
				})])));
				this.owner.add(this.uiSpriteScript)
			},
			onUpdate: function() {},
			coinMove: function() {
				if (this._isRight) {
					var a = this._coin.x;
					a.set__(a._value + this._speedX);
					630 <= this._coin.x._value && (this._isRight = !1)
				} else a = this._coin.x, a.set__(a._value - this._speedX);
				a = this._coin.y;
				a.set__(a._value + this._speedY);
				this._speedY += this._factorY; - 10 > this._coin.y._value && (this._speedY = 5 * this._ctx.gameScale);
				this._speedY > 15 * this._ctx.gameScale && (this._speedY = 15 * this._ctx.gameScale);
				this._coin.y._value > 960 * this._ctx.gameMagnify && this.destroy()
			},
			destroy: function() {
				this.owner.remove(this.uiSpriteScript);
				this.owner.disposeChildren();
				this.owner.dispose()
			},
			__class__: La
		});
	var Ma = function(a, b, c, h) {
		this.isUsed = this._isBalloonShow = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._objectName = h
	};
	f.Computer = Ma;
	Ma.__name__ = ["Computer"];
	Ma.__super__ = n;
	Ma.prototype = q(n.prototype, {
		get_name: function() {
			return "Computer_43"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("monitor/computer");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock &&
				this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x, this._y);
			this._spritePadlock.centerAnchor()
		},
		onUpdate: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef),
				this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showComputerScreen(this._objectName), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon =
					this._currentBalloon));
			this.isStairFind = !1;
			if (Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, "final" == this._objectName && !this.isUsed && (this.isUsed = !0, this._ctx.currentLevel.setTrap()), !1 == this._isBalloonShow && !this.isUsed)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonComputer"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 10 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0;
					a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", a._ctx.currentLevel.player._compMap.Sprite_0.x._value,
						a._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					a._ctx.currentLevel.showComputerScreen(a._objectName);
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = a._currentBalloon
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		__class__: Ma
	});
	var W = function(a, b) {
		b = b.split("u").join("");
		this.r =
			RegExp(a, b)
	};
	f.EReg = W;
	W.__name__ = ["EReg"];
	W.prototype = {
		match: function(a) {
			this.r.global && (this.r.lastIndex = 0);
			this.r.m = this.r.exec(a);
			this.r.s = a;
			return null != this.r.m
		},
		matched: function(a) {
			if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
			throw "EReg::matched";
		},
		matchedPos: function() {
			if (null == this.r.m) throw "No string matched";
			return {
				pos: this.r.m.index,
				len: this.r.m[0].length
			}
		},
		split: function(a) {
			return a.replace(this.r, "#__delim__#").split("#__delim__#")
		},
		__class__: W
	};
	var kb = function(a, b, c,
		h, d, s) {
		this.isUsed = this._isBalloonShow = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._objectName = h;
		this._objId = d;
		this._seconds = s
	};
	f.Electric = kb;
	kb.__name__ = ["Electric"];
	kb.__super__ = n;
	kb.prototype = q(n.prototype, {
		get_name: function() {
			return "Electric_39"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("gameObjects/electricPanel1");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock && this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x, this._y);
			this._spritePadlock.centerAnchor();
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this._objId == this.objectsForSave[a].eId) {
						this.electricOff();
						break
					}++a
				}
			}
		},
		onUpdate: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.actionKey = !1, this._ctx.haveNippers && (this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay",
				this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showWiresPanel(this._objectName, this._seconds), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = this._currentBalloon)));
			this.isStairFind = !1;
			if (Math.abs(this._spritePadlock.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spritePadlock.y._value -
					this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this.isUsed && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b;
				b = this._ctx.haveNippers ? new g(this._ctx.pack.getTexture("BalloonElectric")) : new g(this._ctx.pack.getTexture("BalloonNone"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value -
					18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				this._ctx.haveNippers && b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", a._ctx.currentLevel.player._compMap.Sprite_0.x._value, a._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					a._ctx.currentLevel.showWiresPanel(a._objectName, a._seconds);
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon =
						a._currentBalloon
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		electricOff: function() {
			this.isUsed = !0;
			this._spritePadlock.texture = this._ctx.pack.getTexture("gameObjects/electricPanel2");
			this._ctx.currentLevel.FindAndDeactivateObject(this._objectName)
		},
		electricOpen: function() {
			this.isUsed = !0;
			this._spritePadlock.texture = this._ctx.pack.getTexture("gameObjects/electricPanel2");
			this._ctx.addObjectsToSave(new Q(this._objId))
		},
		__class__: kb
	});
	var lb = function(a, b, c, h, d, s) {
		this._bobOut = !1;
		this._timerStop = 0.5;
		this._timer = 0;
		this._isBalloonShow = this._bobMoveElevator = !1;
		this._currentBalloon = null;
		this._ctx = a;
		this._x = (b - 5) * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this.groupID = h;
		this.isDoor = d;
		this.doorName = s
	};
	f.Elevator = lb;
	lb.__name__ = ["Elevator"];
	lb.__super__ = n;
	lb.prototype = q(n.prototype, {
		get_name: function() {
			return "Elevator_14"
		},
		onAdded: function() {
			var a;
			a = this._ctx.pack.getTexture("gameObjects/elevatorBack");
			this._elevatorBack = new g(a);
			this.owner.addChild((new e).add(this._elevatorBack));
			this._elevatorBack.setScale(this._ctx.gameScale);
			this._elevatorBack.setXY(this._x + 7 * this._ctx.currentScaleCoef, this._y);
			this._elevatorBack.centerAnchor();
			a = this._ctx.pack.getTexture("BobElev");
			this._bobElev = new g(a);
			this.owner.addChild((new e).add(this._bobElev));
			this._bobElev.setScale(this._ctx.gameScale);
			this._bobElev.setXY(this._x + 3 * this._ctx.currentScaleCoef, this._y);
			this._bobElev.centerAnchor();
			this._bobElev.set_visible(!1);
			a = this._ctx.pack.getTexture("gameObjects/elevatorLeftDoor");
			this._leftDoor = new g(a);
			this.owner.addChild((new e).add(this._leftDoor));
			this._leftDoor.setScale(this._ctx.gameScale);
			this._leftDoor.setXY(this._elevatorBack.x._value - (this._leftDoor.texture.get_width() + 2), this._elevatorBack.y._value);
			this._leftDoor.setAnchor(0, 0.5 * this._leftDoor.texture.get_height());
			a = this._ctx.pack.getTexture("gameObjects/elevatorRightDoor");
			this._rightDoor = new g(a);
			this.owner.addChild((new e).add(this._rightDoor));
			this._rightDoor.setScale(this._ctx.gameScale);
			this._rightDoor.setXY(this._elevatorBack.x._value + (this._rightDoor.texture.get_width() - 2), this._elevatorBack.y._value);
			this._rightDoor.setAnchor(this._rightDoor.texture.get_width(), 0.5 * this._rightDoor.texture.get_height())
		},
		onUpdate: function(a) {
			var b = this;
			this._bobOut && (this._timer += a, this._timer >= this._timerStop && (this._timer = 0, this._bobOut = !1, this._bobElev.set_visible(!1), this._ctx.currentLevel.player._compMap.Sprite_0.set_visible(!0), this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("liftOut"),
				this.isDoor = "open"));
			this._bobMoveElevator && (this._timer += a, this._timer >= this._timerStop && (this._timer = 0, this._bobMoveElevator = !1, this._bobElev.set_visible(!1), this._ctx.currentLevel.FindAndSendBobToElevator(this._elevatorBack.x._value), this.isDoor = "open"));
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
				70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && "open" == this.isDoor && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToElevator = !0, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("liftIn", this._elevatorBack.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon),
				this._currentBalloon.dispose(), this._currentBalloon = null));
			this.isStairFind = !1;
			Math.abs(this._elevatorBack.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._elevatorBack.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && "open" == this.isDoor && !this._ctx.currentLevel.player._compMap.BobHero_33._bobMoveElevator && !this._ctx.currentLevel.player._compMap.BobHero_33._bobMoveElevator && (this.isStairFind = !0, !1 == this._isBalloonShow && (0.1 < this._leftDoor.scaleX._value && (this._ctx.pack.getSound("sounds/elevator_open").play(), this._leftDoor.scaleX.animate(this._ctx.currentScaleCoef, 0, 0.5, l.bounceOut), this._rightDoor.scaleX.animate(this._ctx.currentScaleCoef, 0, 0.5, l.bounceOut)), this._isBalloonShow = !0, this._ctx.currentLevel._currentStairNumber = this.groupID, a = new g(this._ctx.pack.getTexture("BalloonStair")), this._currentBalloon = (new e).add(a), this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon),
				a.setScale(this._ctx.gameScale), a.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), a.get_pointerDown().connect(function() {
					b._ctx.currentLevel.player._compMap.BobHero_33._bobGoToElevator = !0;
					b._ctx.currentLevel.player._compMap.BobHero_33.changeAction("liftIn", b._elevatorBack.x._value, b._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					b._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock =
						b.owner;
					b._ctx.currentLevel._plashkaLayer.removeChild(b._currentBalloon);
					b._currentBalloon.dispose();
					b._currentBalloon = null
				})));
			!1 == this.isStairFind && null != this._currentBalloon && (this._ctx.pack.getSound("sounds/elevator_close").play(), this._leftDoor.scaleX.animate(0, this._ctx.gameScale, 0.5, l.bounceOut), this._rightDoor.scaleX.animate(0, this._ctx.gameScale, 0.5, l.bounceOut), this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._currentBalloon =
				null)
		},
		bobInLift: function() {
			this._ctx.pack.getSound("sounds/elevator_close").play();
			this.isDoor = "close";
			this._bobMoveElevator = !0;
			this._isBalloonShow = !1;
			this._bobElev.set_visible(!0);
			this._leftDoor.scaleX.animate(0, this._ctx.gameScale, 0.5, l.bounceOut);
			this._rightDoor.scaleX.animate(0, this._ctx.gameScale, 0.5, l.bounceOut);
			this._ctx.currentLevel.SetPlayerBack()
		},
		closeDoor: function() {
			this.isDoor = "close"
		},
		openDoor: function() {
			this._ctx.pack.getSound("sounds/elevator_open").play();
			this._bobElev.set_visible(!0);
			this._leftDoor.scaleX.animate(this._ctx.gameScale, 0, 0.5, l.bounceOut);
			this._rightDoor.scaleX.animate(this._ctx.gameScale, 0, 0.5, l.bounceOut);
			this._bobOut = !0;
			this._timer = 0
		},
		openDoors: function() {
			this.isDoor = "open";
			this.doorName = "none"
		},
		__class__: lb
	});
	var Q = function(a, b, c) {
		null == c && (c = !1);
		null == b && (b = 0);
		this.eId = a;
		this.ePosX = b;
		this.uBox = c
	};
	f.EnemySet = Q;
	Q.__name__ = ["EnemySet"];
	Q.prototype = {
		__class__: Q
	};
	var wa = function(a, b, c, h) {
		this._inoutSet = !1;
		this._arrowsTimerStop = 0.3;
		this._arrowsTimer = 0;
		this._isBalloonShow = !1;
		this._ctx = a;
		this._x = (b + 10) * this._ctx.gameScale;
		this._y = (c + 10) * this._ctx.gameScale;
		this._targetX = (b + 5) * this._ctx.gameScale;
		this._targetY = (c + 5) * this._ctx.gameScale;
		this.isDoor = "close";
		this._gType = h
	};
	f.ExitTarget = wa;
	wa.__name__ = ["ExitTarget"];
	wa.__super__ = n;
	wa.prototype = q(n.prototype, {
		get_name: function() {
			return "ExitTarget_15"
		},
		onAdded: function() {
			this._innerScale = this._ctx.isSquare ? this._ctx.gameScaleSquare : this._ctx.gameScale;
			this._arrow1 = new g(this._ctx.pack.getTexture("gameObjects/ExitTarget"));
			this.owner.addChild((new e).add(this._arrow1));
			this._arrow1.setScale(this._ctx.gameScale);
			this._arrow1.setXY(this._x, this._y);
			this._arrow1.centerAnchor();
			this._arrow2 = new g(this._ctx.pack.getTexture("gameObjects/ExitTarget"));
			this.owner.addChild((new e).add(this._arrow2));
			this._arrow2.setScale(this._ctx.gameScale);
			this._arrow2.setXY(this._x + 35 * this._ctx.currentScaleCoef, this._y);
			this._arrow2.centerAnchor();
			this._arrow2.scaleX.set__(-1 * Math.abs(this._arrow2.scaleX._value));
			this._arrow3 = new g(this._ctx.pack.getTexture("gameObjects/ExitTarget2"));
			this.owner.addChild((new e).add(this._arrow3));
			this._arrow3.setScale(this._ctx.gameScale);
			this._arrow3.setXY(this._x, this._y + 35 * this._ctx.currentScaleCoef);
			this._arrow3.centerAnchor();
			this._arrow4 = new g(this._ctx.pack.getTexture("gameObjects/ExitTarget2"));
			this.owner.addChild((new e).add(this._arrow4));
			this._arrow4.setScale(this._ctx.gameScale);
			this._arrow4.setXY(this._x + 35 * this._ctx.currentScaleCoef, this._y + 35 * this._ctx.currentScaleCoef);
			this._arrow4.centerAnchor();
			this._arrow4.scaleX.set__(-1 * Math.abs(this._arrow4.scaleX._value));
			this._arrow1.set_pointerEnabled(!1);
			this._arrow2.set_pointerEnabled(!1);
			this._arrow3.set_pointerEnabled(!1);
			this._arrow4.set_pointerEnabled(!1);
			10 == this._ctx.currentLevelNumber && 3 == this._ctx.currentLevelPart && (this._arrow1.set_visible(!1), this._arrow2.set_visible(!1), this._arrow3.set_visible(!1), this._arrow4.set_visible(!1))
		},
		onUpdate: function(a) {
			0 != (this._arrow1._flags & 2) && (this._arrowsTimer += a, this._arrowsTimer >= this._arrowsTimerStop && (this._arrowsTimer = 0, this._inoutSet ? (this._inoutSet = !1, this._arrow1.x.animate(this._arrow1.x._value,
				this._arrow1.x._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow1.y.animate(this._arrow1.y._value, this._arrow1.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.x.animate(this._arrow2.x._value, this._arrow2.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.y.animate(this._arrow2.y._value, this._arrow2.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.x.animate(this._arrow3.x._value, this._arrow3.x._value + 4 * this._innerScale,
				this._arrowsTimerStop, l.linear), this._arrow3.y.animate(this._arrow3.y._value, this._arrow3.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.x.animate(this._arrow4.x._value, this._arrow4.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.y.animate(this._arrow4.y._value, this._arrow4.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear)) : (this._inoutSet = !0, this._arrow1.setXY(this._x, this._y), this._arrow2.setXY(this._x + 29 * this._ctx.currentScaleCoef, this._y),
				this._arrow3.setXY(this._x, this._y + 29 * this._ctx.currentScaleCoef), this._arrow4.setXY(this._x + 29 * this._ctx.currentScaleCoef, this._y + 29 * this._ctx.currentScaleCoef), this._arrow1.x.animate(this._arrow1.x._value, this._arrow1.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow1.y.animate(this._arrow1.y._value, this._arrow1.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.x.animate(this._arrow2.x._value, this._arrow2.x._value + 4 * this._innerScale, this._arrowsTimerStop,
					l.linear), this._arrow2.y.animate(this._arrow2.y._value, this._arrow2.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.x.animate(this._arrow3.x._value, this._arrow3.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.y.animate(this._arrow3.y._value, this._arrow3.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.x.animate(this._arrow4.x._value, this._arrow4.x._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.y.animate(this._arrow4.y._value,
					this._arrow4.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear))), this._isBalloonShow && null != this._currentBalloon && i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 60 * this._ctx.currentScaleCoef), this.isStairFind = !1, Math.abs(this._targetX - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._targetY -
				this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && "close" == this.isDoor && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && 0 != (this._arrow1._flags & 2) && this.openDoor()))
		},
		showTarget: function() {
			this._arrow1.set_visible(!0);
			this._arrow2.set_visible(!0);
			this._arrow3.set_visible(!0);
			this._arrow4.set_visible(!0)
		},
		hideTarget: function() {
			this._arrow1.set_visible(!1);
			this._arrow2.set_visible(!1);
			this._arrow3.set_visible(!1);
			this._arrow4.set_visible(!1)
		},
		openDoor: function() {
			this.isDoor = "open";
			"gameEnd" == this._gType && (this._ctx.currentLevel.calcStars(), this._ctx.currentLevel.levelWin.set__(!0))
		},
		__class__: wa
	});
	var mb = function(a, b, c) {
		this.talking = this.smiling = !1;
		this.talkTimer = this.alertTimer = 0;
		this._ctx = a;
		this._x = b * a.gameScale;
		this._y = c * a.gameScale
	};
	f.FinalMonitorScreen = mb;
	mb.__name__ = ["FinalMonitorScreen"];
	mb.__super__ = n;
	mb.prototype = q(n.prototype, {
		get_name: function() {
			return "FinalMonitorScreen_8"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "effectsAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite = new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.alertLight1 = new g(this._ctx.pack.getTexture("gameObjects/AlertLightOn"));
			this.alertLight2 = new g(this._ctx.pack.getTexture("gameObjects/AlertLightOn"));
			this.owner.addChild((new e).add(this.alertLight1));
			this.owner.addChild((new e).add(this.alertLight2));
			this.alertLight1.centerAnchor();
			this.alertLight2.centerAnchor();
			this.alertLight1.setXY(-84, -1);
			this.alertLight2.setXY(84, -1);
			this.alertLight1.set_visible(!1);
			this.alertLight2.set_visible(!1)
		},
		onUpdate: function(a) {
			this.talking && (this.talkTimer += a, 7 < this.talkTimer && (this.talking = !1, this.smiling = !0, this.changeAction("_HeadLaugh")));
			if (0 != (this.alertLight1._flags & 2) || 0 != (this.alertLight2._flags & 2)) this.alertTimer += a, 1 < this.alertTimer && (this.alertTimer = 0, 0 != (this.alertLight1._flags & 2) ? (this.alertLight1.set_visible(!1),
				this.alertLight2.set_visible(!0)) : 0 != (this.alertLight2._flags & 2) && (this.alertLight2.set_visible(!1), this.alertLight1.set_visible(!0)))
		},
		changeAction: function(a) {
			this.enemySprite.set_visible(!0);
			this._moviePlayer.loop(a, !0);
			this._ctx.pack.getSound("sounds/boss_tv_voice1").play()
		},
		startShow: function() {
			this.enemySprite.set_visible(!0);
			this.talking = !0;
			this._moviePlayer.loop("_HeadTalking", !0);
			this._ctx.pack.getSound("sounds/boss_tv_voice1").play();
			this.alertLight1.set_visible(!0)
		},
		stopAction: function() {
			this.enemySprite.set_visible(!1)
		},
		__class__: mb
	});
	var nb = function(a, b, c, h) {
		this._movieTimerStop = 1;
		this._movieTimer = 0;
		this._isBalloonShow = !1;
		this._ctx = b;
		this._stairName = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this.isDoor = "close";
		this._targetX = c - 20;
		this._targetY = h - 20
	};
	f.FinishDoor = nb;
	nb.__name__ = ["FinishDoor"];
	nb.__super__ = n;
	nb.prototype = q(n.prototype, {
		get_name: function() {
			return "FinishDoor_38"
		},
		onAdded: function() {
			var a = new g(this._ctx.pack.getTexture("gameObjects/elevatorBack"));
			a.setScale(this._ctx.gameScale);
			a.setXY(this._x, this._y);
			a.centerAnchor();
			this._ctx.currentLevel._backLayer.addChild((new e).add(a));
			this._bobElev = new g(this._ctx.pack.getTexture("BobElev"));
			this.owner.addChild((new e).add(this._bobElev));
			this._bobElev.setScale(this._ctx.gameScale);
			this._bobElev.setXY(this._x + 3 * this._ctx.currentScaleCoef, this._y);
			this._bobElev.centerAnchor();
			this._bobElev.set_visible(!1);
			this._spriteDoor = new g(this._ctx.pack.getTexture("gameObjects/door1"));
			this.owner.addChild((new e).add(this._spriteDoor));
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor();
			this._ctx.currentLevel.exitTarget = new wa(this._ctx, this._targetX, this._targetY, "exit");
			this._ctx.currentLevel._lightsLayer.addChild((new e).add(this._ctx.currentLevel.exitTarget))
		},
		onUpdate: function(a) {
			var b = this;
			0 != (this._bobElev._flags & 2) && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._ctx.currentLevel.levelWin.set__(!0)));
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0,
				g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.calcStars(), this._ctx.currentLevel.exitTarget.hideTarget(), this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0, this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this.openDoor(),
				null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())));
			this.isStairFind = !1;
			Math.abs(this._spriteDoor.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spriteDoor.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && "close" == this.isDoor && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && (this._isBalloonShow = !0, a = new g(this._ctx.pack.getTexture("BalloonStair")), this._currentBalloon = (new e).add(a), this._ctx.currentLevel._bulkheadLayer.addChild(this._currentBalloon), a.setScale(this._ctx.gameScale), a.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), a.get_pointerDown().connect(function() {
				b._ctx.currentLevel.calcStars();
				b._ctx.currentLevel.exitTarget.hideTarget();
				b._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0;
				b._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = b.owner;
				b.openDoor();
				null != b._currentBalloon && (b._isBalloonShow = !1, b._ctx.currentLevel._bulkheadLayer.removeChild(b._currentBalloon), b._currentBalloon.dispose())
			})));
			!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		openDoor: function() {
			this._ctx.isPartFinishDoor = !0;
			this.isDoor = "open";
			this._spriteDoor.x.animate(this._x, this._x + 60 * this._ctx.currentScaleCoef, 0.5, l.linear);
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("yes", this._x, this._ctx.currentLevel.player._compMap.Sprite_0.y._value);
			this._ctx.pack.getSound("sounds/final_door_open").play(1)
		},
		closeDoor: function() {
			this._ctx.currentLevel.player._compMap.Sprite_0.set_visible(!1);
			this._bobElev.set_visible(!0);
			this._spriteDoor.x.animate(this._x + 60 *
				this._ctx.currentScaleCoef, this._x, 0.5, l.linear);
			this._ctx.pack.getSound("sounds/final_door_close").play(1)
		},
		__class__: nb
	});
	var ob = function(a, b, c, h, d) {
		this._inoutSet = !1;
		this._arrowsTimerStop = 0.3;
		this._arrowsTimer = 0;
		this._movieTimerStop = 2;
		this._movieTimer = 0;
		this._isBalloonShow = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this.isDoor = "close";
		this._targetX = (b + 5) * this._ctx.gameScale;
		this._targetY = (c + 5) * this._ctx.gameScale;
		this._gType = h;
		this._objId = d
	};
	f.GadgetTarget = ob;
	ob.__name__ = ["GadgetTarget"];
	ob.__super__ = n;
	ob.prototype = q(n.prototype, {
		get_name: function() {
			return "GadgetTarget_9"
		},
		onAdded: function() {
			this._innerScale = this._ctx.isSquare ? this._ctx.gameScaleSquare : this._ctx.gameScale;
			this._arrow1 = new g(this._ctx.pack.getTexture("gameObjects/GadgetTarget"));
			this.owner.addChild((new e).add(this._arrow1));
			this._arrow1.setScale(this._ctx.gameScale);
			this._arrow1.setXY(this._x, this._y);
			this._arrow1.centerAnchor();
			this._arrow2 = new g(this._ctx.pack.getTexture("gameObjects/GadgetTarget"));
			this.owner.addChild((new e).add(this._arrow2));
			this._arrow2.setScale(this._ctx.gameScale);
			this._arrow2.setXY(this._x + 35 * this._ctx.currentScaleCoef, this._y);
			this._arrow2.centerAnchor();
			this._arrow2.scaleX.set__(-1 * Math.abs(this._arrow2.scaleX._value));
			this._arrow3 = new g(this._ctx.pack.getTexture("gameObjects/GadgetTarget2"));
			this.owner.addChild((new e).add(this._arrow3));
			this._arrow3.setScale(this._ctx.gameScale);
			this._arrow3.setXY(this._x, this._y + 35 * this._ctx.currentScaleCoef);
			this._arrow3.centerAnchor();
			this._arrow4 = new g(this._ctx.pack.getTexture("gameObjects/GadgetTarget2"));
			this.owner.addChild((new e).add(this._arrow4));
			this._arrow4.setScale(this._ctx.gameScale);
			this._arrow4.setXY(this._x + 35 * this._ctx.currentScaleCoef, this._y + 35 * this._ctx.currentScaleCoef);
			this._arrow4.centerAnchor();
			this._arrow4.scaleX.set__(-1 * Math.abs(this._arrow4.scaleX._value));
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave =
					this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this._objId == this.objectsForSave[a].eId) {
						this.GetGadget();
						break
					}++a
				}
			}
			10 == this._ctx.currentLevelNumber && (this._arrow1.set_visible(!1), this._arrow2.set_visible(!1), this._arrow3.set_visible(!1), this._arrow4.set_visible(!1))
		},
		onUpdate: function(a) {
			this._arrowsTimer += a;
			this._arrowsTimer >= this._arrowsTimerStop && (this._arrowsTimer = 0, this._inoutSet ? (this._inoutSet = !1, this._arrow1.x.animate(this._arrow1.x._value, this._arrow1.x._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow1.y.animate(this._arrow1.y._value, this._arrow1.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.x.animate(this._arrow2.x._value, this._arrow2.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.y.animate(this._arrow2.y._value, this._arrow2.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.x.animate(this._arrow3.x._value,
				this._arrow3.x._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.y.animate(this._arrow3.y._value, this._arrow3.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.x.animate(this._arrow4.x._value, this._arrow4.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.y.animate(this._arrow4.y._value, this._arrow4.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear)) : (this._inoutSet = !0, this._arrow1.setXY(this._x, this._y), this._arrow2.setXY(this._x +
				29 * this._ctx.currentScaleCoef, this._y), this._arrow3.setXY(this._x, this._y + 29 * this._ctx.currentScaleCoef), this._arrow4.setXY(this._x + 29 * this._ctx.currentScaleCoef, this._y + 29 * this._ctx.currentScaleCoef), this._arrow1.x.animate(this._arrow1.x._value, this._arrow1.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow1.y.animate(this._arrow1.y._value, this._arrow1.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.x.animate(this._arrow2.x._value, this._arrow2.x._value +
				4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow2.y.animate(this._arrow2.y._value, this._arrow2.y._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.x.animate(this._arrow3.x._value, this._arrow3.x._value - 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow3.y.animate(this._arrow3.y._value, this._arrow3.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear), this._arrow4.x.animate(this._arrow4.x._value, this._arrow4.x._value + 4 * this._innerScale, this._arrowsTimerStop,
				l.linear), this._arrow4.y.animate(this._arrow4.y._value, this._arrow4.y._value + 4 * this._innerScale, this._arrowsTimerStop, l.linear)));
			"open" == this.isDoor && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this._ctx.currentLevel.closeNewGadget(), this.destroy()));
			this._isBalloonShow && null != this._currentBalloon && i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
				60 * this._ctx.currentScaleCoef);
			this.isStairFind = !1;
			Math.abs(this._targetX - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._targetY - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && "close" == this.isDoor && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && 0 != (this._arrow1._flags & 2) && (this._ctx.currentLevel.player._compMap.BobHero_33.IdleBob(),
				this.openDoor(), this._arrow1.set_visible(!1), this._arrow2.set_visible(!1), this._arrow3.set_visible(!1), this._arrow4.set_visible(!1), this._isBalloonShow = !0, a = new g(this._ctx.pack.getTexture("BalloonHiden")), this._currentBalloon = (new e).add(a), this._ctx.currentLevel._screensLayer.addChild(this._currentBalloon), a.setScale(this._ctx.gameScale)));
			!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._screensLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		GetGadget: function() {
			this.isDoor = "takeit";
			this._arrow1.set_visible(!1);
			this._arrow2.set_visible(!1);
			this._arrow3.set_visible(!1);
			this._arrow4.set_visible(!1);
			"lockpick" == this._gType && (this._ctx.haveLockpick = !0);
			"nippers" == this._gType && (this._ctx.haveNippers = !0);
			"hackerkit" == this._gType && (this._ctx.haveHackerKit = !0);
			"shocker" == this._gType && (this._ctx.haveShocker = !0);
			"setbox" == this._gType && (this._ctx.haveBox = !0)
		},
		openDoor: function() {
			this.isDoor = "open";
			this._ctx.currentLevel.showNewGadget(this._gType);
			this._ctx.addObjectsToSave(new Q(this._objId));
			this._ctx.currentLevel.exitTarget.showTarget()
		},
		destroy: function() {
			this.isDoor = "destroy";
			this._ctx.currentLevel._screensLayer.removeChild(this._currentBalloon);
			this._currentBalloon.dispose();
			this.owner.disposeChildren();
			this.owner.dispose()
		},
		__class__: ob
	});
	var oc = function(a, b, c) {
		this.currentScreen = "game";
		this.isPartFinishDoor = this.isRankShow = this.controlActivated = !1;
		this.totalBatteries = this.batteriesInLevel = this.levelTimer = this.levelTimerSave = this.batteryCollected1 =
			this.batteryCollected2 = this.batteryCollected3 = 0;
		this.goNextPart = this.kickFirst = !1;
		this.saveCabinNumber = 0;
		this.targetHeight = 530;
		this.targetWidth = 700;
		this.gameMagnify = 1;
		this.isSquare = !1;
		this.currentScaleCoef = this.gameScale = this.gameScaleSquare = 1;
		this.pack = a;
		this.director = c;
		this.messages = Na.parse(b.getFile("messages.ini").toString());
		this.interfaceFont = new R(this.pack, "fonts/Interface");
		this.interfaceFont2 = new R(this.pack, "fonts/Interface2");
		this.messagesFont = new R(this.pack, "fonts/Messages");
		this.segmentFont =
			new R(this.pack, "fonts/Segment");
		this.computerDark = new R(this.pack, "fonts/ComputerDark");
		this.computerLight = new R(this.pack, "fonts/ComputerLight");
		this.currentLevelNumber = 1;
		this._tutorialDone = !1;
		a = k._platform.getStage().get_width() / this.targetWidth;
		b = k._platform.getStage().get_height() / this.targetHeight;
		this.gameScale = Math.min(a, b);
		this.gameScaleSquare = Math.max(a, b);
		this.screenCoef = k._platform.getStage().get_height() / k._platform.getStage().get_width();
		this.isSquare = 1.6 < this.screenCoef ? !1 : !0;
		this.currentScaleCoef =
			this.gameScale;
		this.currentScaleCoef *= this.gameMagnify;
		this.centerCoefX = 0.5 * k._platform.getStage().get_width() - 0.5 * this.targetWidth * this.gameScale;
		this.centerCoefY = 0.5 * k._platform.getStage().get_height() - 0.5 * this.targetHeight * this.gameScale;
		this.currentLeveLSavePart = this.currentLevelPart = 1;
		this.resetSaveArrays();
		this.levelCodes = [];
		this.levelGuards = [];
		this.levelStars = [];
		this.timeArray = [];
		this.levelBatteryArray = [];
		this.batteriesInLevels = [];
		this.levelsStatus = [];
		for (a = 0; 10 > a;) a++, this.levelStars.push(0);
		this.timeArray.push(80);
		this.timeArray.push(80);
		this.timeArray.push(90);
		this.timeArray.push(120);
		this.timeArray.push(125);
		this.timeArray.push(200);
		this.timeArray.push(190);
		this.timeArray.push(270);
		this.timeArray.push(250);
		this.timeArray.push(340);
		this.levelBatteryArray.push(5);
		this.levelBatteryArray.push(6);
		this.levelBatteryArray.push(7);
		this.levelBatteryArray.push(5);
		this.levelBatteryArray.push(7);
		this.levelBatteryArray.push(10);
		this.levelBatteryArray.push(11);
		this.levelBatteryArray.push(9);
		this.levelBatteryArray.push(10);
		this.levelBatteryArray.push(16);
		this.comixPlayed = this.musicPlayed = !1;
		k.volume.set__(1);
		this.loadGameData();
		h5branding.Branding.analyticsEnabled = !1;
		h5branding.Branding.preload("1.0.21");
		h5ads.adWrapper.setAdProvider(new h5ads.GameDistribution('16eb5eb6f9b841688478eb635fde78b5'));
		h5ads.adWrapper.preloadAd(h5ads.AdType.interstitial);
		this.isTimerOn = !1;
		this.timerEntity = new e;
		k._platform.getKeyboard().up.connect(Ka(this, this.handleKeyUp));
		k._platform.getKeyboard().down.connect(Ka(this, this.handleKeyDown));
		this.sitelock = new nc
	};
	f.GameContext = oc;
	oc.__name__ = ["GameContext"];
	oc.prototype = {
		handleKeyUp: function(a) {
			this.controlActivated && this.currentLevel.handleKeyUp(a)
		},
		handleKeyDown: function(a) {
			this.controlActivated && this.currentLevel.handleKeyDown(a);
			"Space" == i.string(a.key) + "" && ("completed" == this.currentScreen && (this.currentScreen = "game", this.director.unwindToScene(this.finishScreens), this.isLevelPointSaved = !1, this.resetSaveArrays(), 10 > this.currentLevelNumber ? (this.currentLevelNumber += 1, this.enterEmptyScene(), this.showAdGameplay()) : (this.stopMenuMusic(),
				this.playComixMusic(), this.enterFinalComics())), "fail" == this.currentScreen && (this.currentScreen = "game", this.director.unwindToScene(this.finishScreens), this.restartScene()))
		},
		loadGameData: function() {
			if (k._platform.getStorage().get_supported()) {
				for (var a = 1; 11 > a;) {
					var b = a++;
					null != k._platform.getStorage().get("level" + b) ? this.levelsStatus[b - 1] = k._platform.getStorage().get("level" + b) : (k._platform.getStorage().set("level" + b, 0), this.levelsStatus[b - 1] = 0);
					null != k._platform.getStorage().get("levStars" + b) ? this.levelStars[b -
						1] = k._platform.getStorage().get("levStars" + b) : (k._platform.getStorage().set("levStars" + b, 0), this.levelStars[b - 1] = 0);
					null != k._platform.getStorage().get("batteries" + b) ? this.batteriesInLevels[b - 1] = k._platform.getStorage().get("batteries" + b) : (k._platform.getStorage().set("batteries" + b, 0), this.batteriesInLevels[b - 1] = 0)
				}
				this.totalBatteries = null != k._platform.getStorage().get("totalBatteries") ? k._platform.getStorage().get("totalBatteries") : 0;
				this.isRankShow = null != k._platform.getStorage().get("isRankShow") ?
					k._platform.getStorage().get("isRankShow") : !1
			}
			0 == this.levelsStatus[0] && (this.levelsStatus[0] = 1)
		},
		getBatteriesInLevel: function(a) {
			return this.levelBatteryArray[a]
		},
		saveGameData: function() {
			if (k._platform.getStorage().get_supported()) {
				k._platform.getStorage().set("level1", this.levelsStatus[0]);
				for (var a = 1; 11 > a;) {
					var b = a++;
					k._platform.getStorage().set("level" + b, this.levelsStatus[b - 1]);
					k._platform.getStorage().set("levStars" + b, this.levelStars[b - 1]);
					k._platform.getStorage().set("batteries" + b, this.batteriesInLevels[b -
						1])
				}
				k._platform.getStorage().set("totalBatteries", this.totalBatteries)
			}
		},
		emptyGadgets: function() {
			this.haveBox = this.haveShocker = this.haveHackerKit = this.haveNippers = this.haveLockpick = !1
		},
		playMenuMusic: function() {
			this.musicPlayed || (this._menuMusic = this.pack.getSound("music/btb3_main_theme").loop(), this.musicPlayed = !0)
		},
		stopMenuMusic: function() {
			this.musicPlayed && (this._menuMusic.dispose(), this.musicPlayed = !1)
		},
		playComixMusic: function() {
			this.comixPlayed || (this._comixMusic = this.pack.getSound("music/btb3_comix_theme").loop(),
				this.comixPlayed = !0)
		},
		stopComixMusic: function() {
			this.comixPlayed && (this._comixMusic.dispose(), this.comixPlayed = !1)
		},
		setComicsPack: function(a) {
			this.comicsPack = a
		},
		enterFinalComics: function(a) {
			null == a && (a = !0);
			var b = this,
				a = D.fromAssets("finalcomics");
			k._platform.loadAssetPack(a).get(function(a) {
				b.finalComicsPack = a;
				b.director.unwindToScene(Yc.create(b), null)
			})
		},
		enterHomeScene: function(a) {
			null == a && (a = !0);
			var b = this;
			h5ads.adWrapper.once("onContentPaused", function() {});
			h5ads.adWrapper.once("onContentResumed",
				function() {
					b.director.unwindToScene(Zc.create(b), null)
				});
			h5ads.adWrapper.showAd(h5ads.AdType.interstitial)
		},
		enterEmptyScene: function() {
			this.director.unwindToScene($c.create(this), null)
		},
		enterLevelMap: function(a) {
			null == a && (a = !0);
			var b = this;
			h5ads.adWrapper.once("onContentPaused", function() {});
			h5ads.adWrapper.once("onContentResumed", function() {
				b.controlActivated = !1;
				null != b.comicsPack && (b.comicsPack.dispose(), b.comicsPack = null);
				null != b.finalComicsPack && (b.finalComicsPack.dispose(), b.finalComicsPack = null);
				b.levelCodes = [];
				b.director.unwindToScene(ad.create(b), a ? new pb(0.5, l.quadOut) : null);
				b.playMenuMusic()
			});
			h5ads.adWrapper.showAd(h5ads.AdType.interstitial)
		},
		showAdGameplay: function() {
			var a = this;
			h5ads.adWrapper.once("onContentPaused", function() {});
			h5ads.adWrapper.once("onContentResumed", function() {
				a.enterPlayingScene()
			});
			h5ads.adWrapper.showAd(h5ads.AdType.interstitial)
		},
		enterPlayingScene: function() {
			this.levelTry = this.batteryCollected3 = this.batteryCollected2 = this.batteryCollected1 = 0;
			this.currentGameScene =
				qb.create(this);
			this.director.unwindToScene(this.currentGameScene, null);
			this.stopMenuMusic()
		},
		restartScene: function(a) {
			null == a && (a = !0);
			var b = this;
			h5ads.adWrapper.once("onContentPaused", function() {});
			h5ads.adWrapper.once("onContentResumed", function() {
				b.controlActivated = !1;
				b.goNextPart = !1;
				b.currentGameScene = qb.create(b);
				b.director.unwindToScene(b.currentGameScene, null);
				b.stopMenuMusic()
			});
			h5ads.adWrapper.showAd(h5ads.AdType.interstitial)
		},
		loadNextPartOfScene: function() {
			this.goNextPart = !0;
			this.currentGameScene =
				qb.create(this);
			this.director.unwindToScene(this.currentGameScene, null)
		},
		showPrompt: function(a, b) {
			this.director.pushScene(bd.create(this, a, b))
		},
		showGameover: function(a, b) {
			this.controlActivated = !1;
			this.currentScreen = "fail";
			this.finishScreens = cd.create(this, a, b);
			this.director.pushScene(this.finishScreens)
		},
		showCompelted: function(a, b) {
			this.controlActivated = !1;
			this.currentScreen = "completed";
			this.pack.getSound("sounds/level_complete").play();
			this.finishScreens = dd.create(this, a, b);
			this.director.pushScene(this.finishScreens)
		},
		getTotalBatteries: function() {
			for (var a = 0, b = 0; 10 > b;) var c = b++,
				a = a + this.batteriesInLevels[c];
			return a
		},
		getStars: function(a, b) {
			var c;
			c = 1.1 * this.timeArray[b - 1];
			this.batteryPercent = this.docsPickedOnLevel / this.levelBatteryArray[b - 1];
			c = this.batteryPercent * (a > c ? 100 * (c / a) : 100);
			return 99 < c ? 3 : 60 <= c && 99 >= c ? 2 : 20 <= c && 60 >= c ? 1 : 0
		},
		resetSaveArrays: function() {
			this.tempObjectsForSave = [];
			this.tempObjectsForSave2 = [];
			this.tempObjectsForSave3 = [];
			this.objectsForSave1 = [];
			this.objectsForSave2 = [];
			this.objectsForSave3 = [];
			this.currentLevelPart =
				1;
			this.goNextPart = !1
		},
		addObjectsToSave: function(a) {
			1 == this.currentLevelPart && this.tempObjectsForSave.push(a);
			2 == this.currentLevelPart && this.tempObjectsForSave2.push(a);
			3 == this.currentLevelPart && this.tempObjectsForSave3.push(a)
		},
		refreshSaveArrays: function() {
			this.tempObjectsForSave = [];
			this.tempObjectsForSave2 = [];
			this.tempObjectsForSave3 = [];
			if (1 == this.currentLevelPart)
				for (var a = 0, b = this.objectsForSave1.length; a < b;) this.addObjectsToSave(new Q(this.objectsForSave1[a].eId, this.objectsForSave1[a].ePosX,
					this.objectsForSave1[a].uBox)), ++a;
			if (2 == this.currentLevelPart) {
				a = 0;
				for (b = this.objectsForSave2.length; a < b;) this.addObjectsToSave(new Q(this.objectsForSave2[a].eId, this.objectsForSave2[a].ePosX, this.objectsForSave2[a].uBox)), ++a
			}
			if (3 == this.currentLevelPart) {
				a = 0;
				for (b = this.objectsForSave3.length; a < b;) this.addObjectsToSave(new Q(this.objectsForSave3[a].eId, this.objectsForSave3[a].ePosX, this.objectsForSave3[a].uBox)), ++a
			}
		},
		copyTempToSave: function() {
			this.currentLeveLSavePart = this.currentLevelPart;
			if (1 ==
				this.currentLevelPart) {
				this.objectsForSave1 = [];
				for (var a = 0, b = this.tempObjectsForSave.length; a < b;) this.objectsForSave1.push(this.tempObjectsForSave[a]), ++a
			}
			if (2 == this.currentLevelPart) {
				this.objectsForSave2 = [];
				a = 0;
				for (b = this.tempObjectsForSave2.length; a < b;) this.objectsForSave2.push(this.tempObjectsForSave2[a]), ++a
			}
			if (3 == this.currentLevelPart) {
				this.objectsForSave3 = [];
				a = 0;
				for (b = this.tempObjectsForSave3.length; a < b;) this.objectsForSave3.push(this.tempObjectsForSave3[a]), ++a
			}
		},
		__class__: oc
	};
	var Oa = function(a,
		b, c) {
		null == c && (c = 0);
		null == b && (b = 0);
		null == a && (a = 0);
		this.x = a;
		this.y = b;
		this.guardId = c;
		this.isCovered = !1
	};
	f.GuardOut = Oa;
	Oa.__name__ = ["GuardOut"];
	Oa.prototype = {
		__class__: Oa
	};
	var rb = function(a, b, c, h, d) {
		this._timerStop = 0.5;
		this._timer = 0;
		this._isBalloonShow = this._taked = this._batteryFlyUp = this._batteryFly = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._objId = h;
		this._qBat = d
	};
	f.Hiden = rb;
	rb.__name__ = ["Hiden"];
	rb.__super__ = n;
	rb.prototype = q(n.prototype, {
		get_name: function() {
			return "Hiden_42"
		},
		onAdded: function() {
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this._objId == this.objectsForSave[a].eId) {
						2 == this._ctx.currentLevelPart ? this._ctx.batteryCollected2 += this._qBat : 3 == this._ctx.currentLevelPart ? this._ctx.batteryCollected3 +=
							this._qBat : this._ctx.batteryCollected1 += this._qBat;
						a = this._ctx.currentLevel.batery;
						a.set__(a._value + this._qBat);
						this._taked = !0;
						break
					}++a
				}
			}
		},
		onUpdate: function(a) {
			var b = this;
			this._batteryFlyUp && (this._timer += a, this._timer >= this._timerStop && (this._timer = 0, this._batteryFlyUp = !1, this._batterySprite.x.animate(this._batterySprite.x._value, 100 * this._ctx.currentScaleCoef, 0.5, l.linear), this._batterySprite.y.animate(this._batterySprite.y._value, 15 * this._ctx.currentScaleCoef, 0.5, l.linear), this._timerStop = 0.5,
				this._batteryFly = !0));
			this._batteryFly && (this._timer += a, a = this._batterySprite.rotation, a.set__(a._value + 15), this._timer >= this._timerStop && (this._batteryFly = !1, this._ctx.addObjectsToSave(new Q(this._objId)), a = this._ctx.currentLevel.batery, a.set__(a._value + this._qBat), this.destroy()));
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
				70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), 2 == this._ctx.currentLevelPart ? this._ctx.batteryCollected2 += this._qBat : 3 == this._ctx.currentLevelPart ? this._ctx.batteryCollected3 += this._qBat : this._ctx.batteryCollected1 += this._qBat, this._taked = !0, this.isStairFind = !1, this._batterySprite = new g(this._ctx.pack.getTexture("gameObjects/Battery")), this._battery = (new e).add(this._batterySprite), this._ctx.currentLevel._plashkaLayer.addChild(this._battery), this._batterySprite.setScale(this._ctx.gameScale), this._batterySprite.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._batterySprite.centerAnchor(), this._batterySprite.y.animate(this._batterySprite.y._value, this._batterySprite.y._value -
				50 * this._ctx.currentScaleCoef, 0.5, l.linear), this._batteryFlyUp = !0, this._ctx.pack.getSound("sounds/get_battery").play()));
			this.isStairFind = !1;
			Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._taked && !this._ctx.kickFirst && !this._ctx.isGameEnd && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy && (this.isStairFind = !0, !1 == this._isBalloonShow &&
				(this._isBalloonShow = !0, 1 == this._ctx.currentLevelNumber && !this._taked && (this._ctx.currentLevel.tutor.tipsActivate[2] = 0, this._y < 100 * this._ctx.gameScale ? (this._ctx.currentLevel.tutor.showTip(3, "backpack"), this._ctx.currentLevel.tutor.tipName = "tip" + this._objId) : this._y < 200 * this._ctx.gameScale && (this._ctx.currentLevel.tutor.showTip(3), this._ctx.currentLevel.tutor.tipName = "tip" + this._objId)), a = new g(this._ctx.pack.getTexture("BalloonHiden")), this._currentBalloon = (new e).add(a), this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon),
					a.setScale(this._ctx.gameScale), a.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), a.get_pointerDown().connect(function() {
						1 == b._ctx.currentLevelNumber && 1 == b._ctx.currentLevel.tutor.tipsActivate[2] && b._ctx.currentLevel.tutor.closeTip(3);
						b._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", b._ctx.currentLevel.player._compMap.Sprite_0.x._value, b._ctx.currentLevel.player._compMap.Sprite_0.y._value);
						2 == b._ctx.currentLevelPart ? b._ctx.batteryCollected2 += b._qBat : 3 == b._ctx.currentLevelPart ? b._ctx.batteryCollected3 += b._qBat : b._ctx.batteryCollected1 += b._qBat;
						b._taked = !0;
						b.isStairFind = !1;
						b._batterySprite = new g(b._ctx.pack.getTexture("gameObjects/Battery"));
						b._battery = (new e).add(b._batterySprite);
						b._ctx.currentLevel._plashkaLayer.addChild(b._battery);
						b._batterySprite.setScale(b._ctx.gameScale);
						b._batterySprite.setXY(b._ctx.currentLevel.player._compMap.Sprite_0.x._value, b._ctx.currentLevel.player._compMap.Sprite_0.y._value);
						b._batterySprite.centerAnchor();
						b._batterySprite.y.animate(b._batterySprite.y._value, b._batterySprite.y._value - 50 * b._ctx.currentScaleCoef, 0.5, l.linear);
						b._batteryFlyUp = !0;
						b._ctx.pack.getSound("sounds/get_battery").play()
					})));
			!1 == this.isStairFind && null != this._currentBalloon && (1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[2] && this._ctx.currentLevel.tutor.tipName == "tip" + this._objId && this._ctx.currentLevel.tutor.closeTip(3), this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon),
				this._currentBalloon.dispose())
		},
		destroy: function() {
			this._ctx.currentLevel._plashkaLayer.removeChild(this._battery);
			this._battery.dispose();
			this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon);
			this._currentBalloon.dispose();
			this.owner.disposeChildren();
			this.owner.dispose()
		},
		__class__: rb
	});
	var r = function() {};
	f.HxOverrides = r;
	r.__name__ = ["HxOverrides"];
	r.dateStr = function(a) {
		var b = a.getMonth() + 1,
			c = a.getDate(),
			h = a.getHours(),
			d = a.getMinutes(),
			s = a.getSeconds();
		return a.getFullYear() + "-" +
			(10 > b ? "0" + b : "" + b) + "-" + (10 > c ? "0" + c : "" + c) + " " + (10 > h ? "0" + h : "" + h) + ":" + (10 > d ? "0" + d : "" + d) + ":" + (10 > s ? "0" + s : "" + s)
	};
	r.strDate = function(a) {
		switch (a.length) {
			case 8:
				var a = a.split(":"),
					b = new Date;
				b.setTime(0);
				b.setUTCHours(a[0]);
				b.setUTCMinutes(a[1]);
				b.setUTCSeconds(a[2]);
				return b;
			case 10:
				return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
			case 19:
				return b = a.split(" "), a = b[0].split("-"), b = b[1].split(":"), new Date(a[0], a[1] - 1, a[2], b[0], b[1], b[2]);
			default:
				throw "Invalid date format : " + a;
		}
	};
	r.cca = function(a, b) {
		var c =
			a.charCodeAt(b);
		return c != c ? void 0 : c
	};
	r.substr = function(a, b, c) {
		if (null != b && 0 != b && null != c && 0 > c) return "";
		null == c && (c = a.length);
		0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
		return a.substr(b, c)
	};
	r.remove = function(a, b) {
		var c = a.indexOf(b);
		if (-1 == c) return !1;
		a.splice(c, 1);
		return !0
	};
	r.iter = function(a) {
		return {
			cur: 0,
			arr: a,
			hasNext: function() {
				return this.cur < this.arr.length
			},
			next: function() {
				return this.arr[this.cur++]
			}
		}
	};
	var sb = function() {};
	f.Lambda = sb;
	sb.__name__ = ["Lambda"];
	sb.array = function(a) {
		for (var b = [], a = od(a)(); a.hasNext();) {
			var c = a.next();
			b.push(c)
		}
		return b
	};
	sb.count = function(a, b) {
		var c = 0;
		if (null == b)
			for (var h = od(a)(); h.hasNext();) h.next(), c++;
		else
			for (h = od(a)(); h.hasNext();) {
				var d = h.next();
				b(d) && c++
			}
		return c
	};
	var tb = function(a, b, c, h) {
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this.laserName = h
	};
	f.LaserLine = tb;
	tb.__name__ = ["LaserLine"];
	tb.__super__ = n;
	tb.prototype = q(n.prototype, {
		get_name: function() {
			return "LaserLine_11"
		},
		onAdded: function() {
			var a;
			a = this._ctx.pack.getTexture("gameObjects/laserLines");
			this.spriteLaser = i.instance(this.owner._compMap.Sprite_0, g);
			null == this.spriteLaser && this.owner.add(this.spriteLaser = new g(a));
			this.spriteLaser.texture = a;
			this.spriteLaser.setScale(this._ctx.gameScale);
			this.spriteLaser.setXY(this._x, this._y);
			this.spriteLaser.centerAnchor()
		},
		onUpdate: function() {
			Math.abs(this.spriteLaser.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 10 * this._ctx.currentScaleCoef && Math.abs(this.spriteLaser.y._value - this._ctx.currentLevel.player._compMap.Sprite_0.y._value) <
				30 * this._ctx.currentScaleCoef && "silence" == this._ctx.currentLevel.globalState && (this._ctx.currentLevel.alertUp(), this._ctx.currentLevel.gameOver())
		},
		deactivateLaser: function() {
			this.owner.remove(this.spriteLaser);
			this.spriteLaser.dispose();
			this.dispose()
		},
		__class__: tb
	});
	var pc = function(a, b) {
		null == b && (b = "");
		null == a && (a = "");
		this.doorName = a;
		this.code = b
	};
	f.LevelCode = pc;
	pc.__name__ = ["LevelCode"];
	pc.prototype = {
		__class__: pc
	};
	var vb = function(a) {
		this._watchTimer = 0;
		this._bobMove = !1;
		this._timerElev = 0;
		this._elevCoefY =
			20;
		this._stairCoefY = 5;
		this._isSPOnScreen = this._isNoteOnScreen = this._isNewGadgetOnScreen = this._isPadlockOnScreen = this._isWiresPanelOnScreen = this._isCodePanelOnScreen = this._isComputerOnScreen = this._isHackPanelOnScreen = !1;
		this.playerDirection = "left";
		this.PLAYER_SPEED = 2.2;
		this.codePanelActive = !1;
		this.digit0 = this.digit1 = this.digit2 = this.digit3 = this.digit4 = this.digit5 = this.digit6 = this.digit7 = this.digit8 = this.digit9 = "none";
		this.levelCreated = this.isPlayerTryAction = this.leftKey = this.rightKey = this.actionKey =
			this.downKey = !1;
		this.ySdvigCoef = 0;
		this._ctx = a;
		this._walls = [];
		this._stairs = [];
		this._elevators = [];
		this._sidedoors = [];
		this._cameras = [];
		this._lasers = [];
		this._codepads = [];
		this._shadows = [];
		a.levelGuards = [];
		this.hidenDoc = 0;
		this.score = new z(1);
		this.talert = new z(5);
		this.batery = new z(0);
		this.watch = new z(0);
		this.levelWin = new z(!1);
		this.paused = new z(!1);
		this.restart = new z(!1);
		this._stairCoefY *= this._ctx.currentScaleCoef;
		this._elevCoefY *= this._ctx.currentScaleCoef;
		this.wPanel = new ub(this._ctx);
		this.PLAYER_SPEED *=
			this._ctx.gameScale;
		this.globalState = "silence"
	};
	f.LevelModel = vb;
	vb.__name__ = ["LevelModel"];
	vb.__super__ = n;
	vb.prototype = q(n.prototype, {
		get_name: function() {
			return "LevelModel_5"
		},
		onAdded: function() {
			this._ctx.isPartFinishDoor = !1;
			this._worldLayer = new e;
			this.owner.addChild(this._worldLayer);
			this._worldLayer.add(new m);
			this.gameCamera = this._worldLayer._compMap.Sprite_0;
			this.gameCamera.setXY(this._ctx.centerCoefX, this._ctx.centerCoefY);
			this._ctx.emptyGadgets();
			1 < this._ctx.currentLevelNumber && (this._ctx.haveLockpick = !0);
			3 < this._ctx.currentLevelNumber && (this._ctx.haveNippers = !0);
			5 < this._ctx.currentLevelNumber && (this._ctx.haveHackerKit = !0);
			7 < this._ctx.currentLevelNumber && (this._ctx.haveBox = !0);
			if (9 < this._ctx.currentLevelNumber || 9 == this._ctx.currentLevelNumber && 2 == this._ctx.currentLevelPart) this._ctx.haveShocker = !0;
			this._ctx.isLevelPointSaved && !this._ctx.goNextPart ? this._ctx.currentLevelPart = this._ctx.currentLeveLSavePart : !this._ctx.isLevelPointSaved && !this._ctx.goNextPart && (this._ctx.currentLevelPart = 1, this._ctx.levelTimer =
				0, this._ctx.levelTimerSave = 0, this._ctx.levelCodes = []);
			2 == this._ctx.currentLevelPart ? (this._backgroundPicture = new g(this._ctx.pack.getTexture("GameBackground" + this._ctx.currentLevelNumber + "2")), this._ctx.batteryCollected2 = 0) : 3 == this._ctx.currentLevelPart ? (this._backgroundPicture = new g(this._ctx.pack.getTexture("GameBackground" + this._ctx.currentLevelNumber + "3")), this._ctx.batteryCollected3 = 0) : (this._backgroundPicture = new g(this._ctx.pack.getTexture("GameBackground" + this._ctx.currentLevelNumber)), this._ctx.batteryCollected1 =
				0);
			this._worldLayer.addChild(this._backLayer = new e);
			this._worldLayer.addChild(this._backgroundLayer = new e);
			this._worldLayer.addChild(this._objectsLayer = new e);
			this._worldLayer.addChild(this._lightsLayer = new e);
			this._worldLayer.addChild(this._charactersLayer = new e);
			this._worldLayer.addChild(this._shadowsLayer = new e);
			this._worldLayer.addChild(this._enemiesLayer = new e);
			this._worldLayer.addChild(this._screensLayer = new e);
			this._worldLayer.addChild(this._bulkheadLayer = new e);
			this._worldLayer.addChild(this._plashkaLayer =
				new e);
			this._worldLayer.addChild(this._tipsLayer = new e);
			1 == this._ctx.currentLevelNumber && (this.tutor = new qa(this._ctx), this._tipsLayer.addChild((new e).add(this.tutor)), this.tutor.showTip(1));
			2 == this._ctx.currentLevelNumber && (this.tutor = new qa(this._ctx), this._tipsLayer.addChild((new e).add(this.tutor)), this.tutor.showTip(8));
			4 == this._ctx.currentLevelNumber && (this.tutor = new qa(this._ctx), this._tipsLayer.addChild((new e).add(this.tutor)), this.tutor.showTip(9));
			8 == this._ctx.currentLevelNumber && 2 == this._ctx.currentLevelPart &&
				(this.tutor = new qa(this._ctx), this._tipsLayer.addChild((new e).add(this.tutor)), this.tutor.showTip(10));
			this.timeBackGnd = new g(this._ctx.pack.getTexture("buttons/TimeSign"));
			this.timeBackGnd.setScale(this._ctx.gameScale);
			this.timeBackGnd.setXY(65, 30);
			this.timeBackGnd.centerAnchor();
			this.timeLabel = new S(this._ctx.interfaceFont);
			this.timeLabel.setXY(67, 22);
			this.timeLabel.setScale(this._ctx.gameScale);
			this.timeLabel.set_text("0");
			this.bateryBackGnd = new g(this._ctx.pack.getTexture("buttons/BaterySign"));
			this.bateryBackGnd.setScale(this._ctx.gameScale);
			this.bateryBackGnd.setXY(180, 30);
			this.bateryBackGnd.centerAnchor();
			this.bateryLabel = new S(this._ctx.interfaceFont);
			this.bateryLabel.setXY(210, 24);
			this.bateryLabel.setScale(this._ctx.gameScale);
			this.bateryLabel.set_text("0");
			this.bateryLabel.set_text("0");
			this.pauseBtn = new g(this._ctx.pack.getTexture("buttons/BtnPause"));
			this.pauseBtn.setXY((this._ctx.targetWidth - 40) * this._ctx.gameScale, 25 * this._ctx.currentScaleCoef);
			this.pauseBtn.setScale(this._ctx.gameScale);
			this.pauseBtn.centerAnchor();
			this.restartBtn = new g(this._ctx.pack.getTexture("buttons/BtnReset"));
			this.restartBtn.setXY((this._ctx.targetWidth - 85) * this._ctx.gameScale, 25 * this._ctx.currentScaleCoef);
			this.restartBtn.setScale(this._ctx.gameScale);
			this.restartBtn.centerAnchor();
			this._plashkaLayer.addChild((new e).add(this.timeBackGnd));
			this._plashkaLayer.addChild((new e).add(this.bateryBackGnd));
			this._plashkaLayer.addChild((new e).add(this.timeLabel));
			this._plashkaLayer.addChild((new e).add(this.bateryLabel));
			this._screensLayer.addChild((new e).add(this.pauseBtn));
			this._screensLayer.addChild((new e).add(this.restartBtn));
			var a = new g(this._ctx.pack.getTexture("RightBackLine"));
			this._tipsLayer.addChild((new e).add(a));
			a.setXY(675, 0);
			this._objectsLayer.addChild((new e).add(this._backgroundPicture));
			this._backgroundPicture.setScale(this._ctx.gameScale);
			this._backgroundPicture.setXY(6 * this._ctx.currentScaleCoef, 35 * this._ctx.currentScaleCoef);
			this.objectsId = 1;
			this.saveCabinId = 0;
			this.chargeBases = [];
			this.gadgetExist = !1;
			a = p.parse(this.getXMLFromFile());
			for (a = (new Pa(a.firstElement())).node.resolve("objects").nodes.resolve("object").iterator(); a.hasNext();) {
				var b = a.next();
				if ("BobHero" == b.att.resolve("className")) {
					var c = new gb(this._ctx, "bob", i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")));
					this.player = (new e).add(c);
					this._charactersLayer.addChild(this.player)
				}
				"GuardA" == b.att.resolve("className") && (c = new wb(this._ctx, b.att.resolve("className"), i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")),
					i.parseFloat(b.att.resolve("viewZL")), i.parseFloat(b.att.resolve("viewZR")), this.objectsId), this._enemiesLayer.addChild((new e).add(c)), this.objectsId++);
				"GuardB" == b.att.resolve("className") && (c = new xa(this._ctx, b.att.resolve("className"), i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseFloat(b.att.resolve("viewZL")), i.parseFloat(b.att.resolve("viewZR")), this.objectsId), this._enemiesLayer.addChild((new e).add(c)), this.objectsId++);
				"Professor" == b.att.resolve("className") && (c =
					new xb(this._ctx, b.att.resolve("className"), i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseFloat(b.att.resolve("viewZL")), i.parseFloat(b.att.resolve("viewZR")), i.parseFloat(b.att.resolve("buttonPos")), i.parseFloat(b.att.resolve("busyPos")), this.objectsId), this._enemiesLayer.addChild((new e).add(c)), this.objectsId++);
				"Mummy" == b.att.resolve("className") && (c = new Qa(this._ctx, b.att.resolve("className"), i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseFloat(b.att.resolve("viewZL")),
					i.parseFloat(b.att.resolve("viewZR")), this.objectsId), this._enemiesLayer.addChild((new e).add(c)), this.objectsId++);
				"Elevator" == b.att.resolve("className") && (c = new lb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseInt(b.att.resolve("groupId")), b.att.resolve("door"), b.att.resolve("doorName")), this._objectsLayer.addChild((new e).add(c)), this._elevators.push(c));
				if ("StairUp" == b.att.resolve("className") || "StairDown" == b.att.resolve("className")) {
					var c = new yb(b.att.resolve("className"),
							this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseInt(b.att.resolve("groupId")), b.att.resolve("door"), b.att.resolve("doorName"), b.att.resolve("doorType")),
						h = (new e).add(c);
					this._backgroundLayer.addChild(h);
					this._backgroundLayer.addChild(h);
					this._stairs.push(c)
				}
				"FinishDoor" == b.att.resolve("className") && (c = new nb(b.att.resolve("className"), this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y"))), this._backLayer.addChild((new e).add(c)));
				"PartDoor" ==
				b.att.resolve("className") && (2 == i.parseInt(b.att.resolve("part")) && (this.pDoor1 = new Ra(b.att.resolve("className"), this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseInt(b.att.resolve("part"))), this._backLayer.addChild((new e).add(this.pDoor1))), 3 == i.parseInt(b.att.resolve("part")) && (this.pDoor2 = new Ra(b.att.resolve("className"), this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseInt(b.att.resolve("part"))), this._backLayer.addChild((new e).add(this.pDoor2))));
				"StartDoor" == b.att.resolve("className") && (this.startDoor = new zb(b.att.resolve("className"), this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y"))), this._backLayer.addChild((new e).add(this.startDoor)));
				"ChargeBase" == b.att.resolve("className") && (this._savePointX = (i.parseFloat(b.att.resolve("x")) + 3) * this._ctx.currentScaleCoef, this._savePointY = i.parseFloat(b.att.resolve("y")) * this._ctx.currentScaleCoef, c = new ib(b.att.resolve("className"), this._ctx, i.parseFloat(b.att.resolve("x")),
					i.parseFloat(b.att.resolve("y")), this.saveCabinId), this._objectsLayer.addChild((new e).add(c)), this.chargeBases.push(c), this.saveCabinId++);
				"Sidedoor" == b.att.resolve("className") && (c = new Ab(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), b.att.resolve("door"), b.att.resolve("doorName")), this._objectsLayer.addChild((new e).add(c)), this._sidedoors.push(c));
				"LaserLine" == b.att.resolve("className") && (c = new tb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")),
					b.att.resolve("doorName")), this._objectsLayer.addChild((new e).add(c)), this._lasers.push(c));
				"Padlock" == b.att.resolve("className") && (c = new Bb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), b.att.resolve("doorName"), b.att.resolve("direction"), i.parseInt(b.att.resolve("plevel")), this.objectsId), this._lightsLayer.addChild((new e).add(c)), this.objectsId++);
				"Electric" == b.att.resolve("className") && (c = new kb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")),
					b.att.resolve("doorName"), this.objectsId, i.parseInt(b.att.resolve("alarmTimer"))), this._objectsLayer.addChild((new e).add(c)), this.objectsId++);
				if ("Codepad" == b.att.resolve("className")) {
					for (var c = !1, h = 0, d = this._ctx.levelCodes.length; h < d;) {
						if (b.att.resolve("doorName") == this._ctx.levelCodes[h].doorName) {
							this._doorCode = this._ctx.levelCodes[h].code;
							c = !0;
							break
						}++h
					}!1 == c && (this._doorCode = this.generateDoorCode());
					c = new jb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), b.att.resolve("doorName"),
						this._doorCode, this.objectsId);
					this._objectsLayer.addChild((new e).add(c));
					this._codepads.push(c);
					this.objectsId++
				}
				"Message" == b.att.resolve("className") && (c = new Cb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), b.att.resolve("amessage"), b.att.resolve("doorName")), this._objectsLayer.addChild((new e).add(c)));
				"Wall" == b.att.resolve("className") && this._walls.push(new Sa(i.parseFloat(b.att.resolve("x")) * this._ctx.gameScale, i.parseFloat(b.att.resolve("y")) * this._ctx.gameScale));
				"Hiden" == b.att.resolve("className") && (c = new rb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), this.objectsId, i.parseInt(b.att.resolve("quantity"))), this._objectsLayer.addChild((new e).add(c)), this.objectsId++, this.hidenDoc++);
				"Bulkhead" == b.att.resolve("className") && (c = new g(this._ctx.pack.getTexture("Bulkhead")), "wood" == b.att.resolve("bulkname") && (c = new g(this._ctx.pack.getTexture("Bulkhead"))), "woodsl" == b.att.resolve("bulkname") && (c = new g(this._ctx.pack.getTexture("Bulkhead_wsl"))),
					"woodsr" == b.att.resolve("bulkname") && (c = new g(this._ctx.pack.getTexture("Bulkhead_wsr"))), "steel" == b.att.resolve("bulkname") && (c = new g(this._ctx.pack.getTexture("Bulkhead2"))), this._bulkheadLayer.addChild((new e).add(c)), c.centerAnchor(), c.setXY(i.parseFloat(b.att.resolve("x")) * this._ctx.gameScale, i.parseFloat(b.att.resolve("y")) * this._ctx.gameScale - 1), c.setScaleXY(1, 0.9), c.set_pointerEnabled(!1));
				"GadgetTarget" == b.att.resolve("className") && ("gameEnd" == b.att.resolve("gadgetName") ? (this.exitTarget =
					new wa(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), "gameEnd"), this._lightsLayer.addChild((new e).add(this.exitTarget))) : (this.gadget = new ob(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), b.att.resolve("gadgetName"), this.objectsId), this._lightsLayer.addChild((new e).add(this.gadget)), this.objectsId++, this.gadgetExist = !0));
				"Computer" == b.att.resolve("className") && (c = new Ma(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")),
					b.att.resolve("doorName")), this._objectsLayer.addChild((new e).add(c)));
				"FinalComputer" == b.att.resolve("className") && (c = new Ma(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), "final"), this._objectsLayer.addChild((new e).add(c)));
				"screenBack" == b.att.resolve("className") && (this.monitorEnd = new mb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y"))), this._objectsLayer.addChild((new e).add(this.monitorEnd)), this.monitorEnd.stopAction());
				"EndDoors" == b.att.resolve("className") &&
					(this.endDoors = new g(this._ctx.pack.getTexture("gameObjects/EndDoors")), this._objectsLayer.addChild((new e).add(this.endDoors)), this.endDoors.setScale(this._ctx.gameScale), this.endDoors.setXY(i.parseFloat(b.att.resolve("x")) * this._ctx.gameScale, i.parseFloat(b.att.resolve("y")) * this._ctx.gameScale));
				"TrapDoor" == b.att.resolve("className") && (this.trapDoors = new g(this._ctx.pack.getTexture("gameObjects/TrapDoor")), this._objectsLayer.addChild((new e).add(this.trapDoors)), this.trapDoors.setScale(this._ctx.gameScale),
					this.trapDoors.setXY(i.parseFloat(b.att.resolve("x")) * this._ctx.gameScale, i.parseFloat(b.att.resolve("y")) * this._ctx.gameScale), this.trapDoors.set_visible(!1));
				"CrashWalls" == b.att.resolve("className") && (this.crashDoors = new g(this._ctx.pack.getTexture("gameObjects/CrashWalls")), this._objectsLayer.addChild((new e).add(this.crashDoors)), this.crashDoors.setScale(this._ctx.gameScale), this.crashDoors.setXY(i.parseFloat(b.att.resolve("x")) * this._ctx.gameScale, i.parseFloat(b.att.resolve("y")) * this._ctx.gameScale));
				"Shadow" == b.att.resolve("className") && (c = new Db(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseInt(b.att.resolve("sw"))), this._objectsLayer.addChild((new e).add(c)), this._shadows.push(c));
				"Camera" == b.att.resolve("className") && (b = new Eb(this._ctx, i.parseFloat(b.att.resolve("x")), i.parseFloat(b.att.resolve("y")), i.parseFloat(b.att.resolve("delay")), i.parseFloat(b.att.resolve("viewZL")), i.parseFloat(b.att.resolve("viewZR"))), this._screensLayer.addChild((new e).add(b)),
					this._cameras.push(b))
			}
			this.gadgetExist && this.exitTarget.hideTarget();
			this._bobShadow = new g(this._ctx.pack.getTexture("BobShadow"));
			this._bulkheadLayer.addChild((new e).add(this._bobShadow));
			this._bobShadow.setScale(this._ctx.gameScale);
			this._bobShadow.centerAnchor();
			this._bobShadow.set_visible(!1);
			a = 2 == this._ctx.currentLevelPart && 10 > this._ctx.currentLevelNumber ? new g(this._ctx.pack.getTexture("Shadows" + this._ctx.currentLevelNumber + "2")) : 3 == this._ctx.currentLevelPart && 10 > this._ctx.currentLevelNumber ?
				new g(this._ctx.pack.getTexture("Shadows" + this._ctx.currentLevelNumber + "3")) : new g(this._ctx.pack.getTexture("Shadows" + this._ctx.currentLevelNumber));
			this._shadowsLayer.addChild((new e).add(a));
			10 == this._ctx.currentLevelNumber && 1 < this._ctx.currentLevelPart && a.setAlpha(0);
			1 == this._ctx.currentLevelNumber && a.setXY(8, 120);
			a.setScale(0.9);
			2 == this._ctx.currentLevelNumber && a.setXY(8, 212);
			a.setScale(0.9);
			3 == this._ctx.currentLevelNumber && a.setXY(8, 120);
			a.setScale(0.9);
			4 == this._ctx.currentLevelNumber && a.setXY(8,
				38);
			a.setScale(0.9);
			5 == this._ctx.currentLevelNumber && a.setXY(8, 38);
			a.setScale(0.9);
			6 == this._ctx.currentLevelNumber && (1 == this._ctx.currentLevelPart && a.setXY(8, 37), 2 == this._ctx.currentLevelPart && a.setXY(8, 37));
			7 == this._ctx.currentLevelNumber && (1 == this._ctx.currentLevelPart && a.setXY(8, 37), 2 == this._ctx.currentLevelPart && a.setXY(8, 36));
			8 == this._ctx.currentLevelNumber && a.setXY(8, 35);
			9 == this._ctx.currentLevelNumber && (1 == this._ctx.currentLevelPart && a.setXY(8, 37), 2 == this._ctx.currentLevelPart && a.setXY(183,
				37));
			10 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevelPart && a.setXY(8, 37);
			a = new M(this._ctx.pack, "bobAnim");
			this.moviePlayer = new J(a);
			this.glassEntiry = new e;
			this.glassEntiry.add(this.moviePlayer);
			this.bobGlass = new m;
			this.glassEntiry.add(this.bobGlass);
			this.bobGlass.setScale(this._ctx.gameScale);
			this.bobGlass.set_visible(!1);
			this._shadowsLayer.addChild(this.glassEntiry);
			this.backTap = new g(this._ctx.pack.getTexture("backTap"));
			this._screensLayer.addChild((new e).add(this.backTap));
			this.backTap.setScale(10 *
				this._ctx.gameScale);
			this.backTap.setXY(0, 30 * this._ctx.currentScaleCoef);
			this._gameMusic = this._ctx.pack.getSound("music/btb3_gameplay_theme").loop();
			this._ctx.isGameEnd = !1;
			1 == this._ctx.currentLevelPart && !this._ctx.isLevelPointSaved ? this.batery.set__(0) : (this.batery.set__(this._ctx.batteriesInLevel), this.watch.set__(this._ctx.levelTimer));
			1 == this._ctx.currentLevelNumber && (this._ctx._tutorialDone = !0);
			this._ctx.isLevelPointSaved && !this._ctx.goNextPart ? (this.watch.set__(this._ctx.levelTimerSave), this.player._compMap.BobHero_33.currentPadlock =
				this.chargeBases[this._ctx.saveCabinNumber].owner, this.player._compMap.BobHero_33._bobGoToSave = !0, this.chargeBases[this._ctx.saveCabinNumber].GotoSavePoint(), this._savePointX = this.chargeBases[this._ctx.saveCabinNumber].getX(), this._savePointY = this.chargeBases[this._ctx.saveCabinNumber].getY(), this.player._compMap.BobHero_33.changeAction("save", this._savePointX, this._savePointY), this.player._compMap.BobHero_33._bobGoToStair = !0, this.ActivateControl()) : 1 != this._ctx.currentLevelNumber ? (this.player._compMap.Sprite_0.set_visible(!1),
				this.startDoor.openDoor()) : this.ActivateControl();
			this._ctx.refreshSaveArrays();
			this.levelCreated = !0
		},
		onUpdate: function(a) {
			this._watchTimer += a;
			if (1 <= this._watchTimer) {
				this._watchTimer = 0;
				var b = this.watch;
				b.set__(b._value + 1)
			}
			this._bobMove && (b = this._bobShadow.y, b.set__(b._value + this._elevatorSpeed), Math.abs(this._finishCoor - this._bobShadow.y._value) < 3 * this._ctx.gameScale && (this._bobMove = !1, this.SetPlayerFront()));
			if ("alertTimer" == this.globalState && (b = this.talert, b.set__(b._value - a), 0.1 >= this.talert._value)) {
				this.globalState =
					"silence";
				this.talert.set__(5);
				a = 0;
				for (b = this._cameras.length; a < b;) this._cameras[a].resetCamera(), ++a
			}
			if (!this._isComputerOnScreen && !this._isNewGadgetOnScreen && !this._isNoteOnScreen && !this._isPadlockOnScreen && !this._isWiresPanelOnScreen && !this._isCodePanelOnScreen && !this._isSPOnScreen && !this._isHackPanelOnScreen && !this.player._compMap.BobHero_33._bobMoveElevator && !this.player._compMap.BobHero_33._bobGoToElevator && 0 != (this.player._compMap.Sprite_0._flags & 2) && !this.player._compMap.BobHero_33._bobGoToStair &&
				!this._ctx.isGameEnd && !this._ctx.isPartFinishDoor && (this.leftKey || this.rightKey) && "move" != this.player._compMap.BobHero_33.currentAction) a = this.player._compMap.BobHero_33.bobSprite, this.player._compMap.BobHero_33.changeAction("move", a.x._value, a.y._value, this.playerDirection);
			"move" == this.player._compMap.BobHero_33.currentAction && (a = this.player._compMap.BobHero_33.bobSprite, "left" == this.playerDirection && !this.checkLeftWall() && !this.checkLeftSidedoor() && (b = a.x, b.set__(b._value - this.PLAYER_SPEED)), "right" ==
				this.playerDirection && !this.checkRightWall() && !this.checkRightSidedoor() && (a = a.x, a.set__(a._value + this.PLAYER_SPEED)))
		},
		setTrap: function() {
			this.trapDoors.set_visible(!0);
			this.endDoors.set_visible(!1);
			this.exitTarget.showTarget();
			this.monitorEnd.startShow();
			this._walls.push(new Sa(306, 383));
			this._walls.push(new Sa(342, 383));
			var a = (new e).add(new xa(this._ctx, "GuardB", 65, 88, 0, 350, this.objectsId));
			this._enemiesLayer.addChild(a);
			this.objectsId++;
			a = (new e).add(new xa(this._ctx, "GuardB", 630, 187, 560, 0, this.objectsId));
			this._enemiesLayer.addChild(a);
			this.objectsId++;
			a = new Qa(this._ctx, "Mummy", 300, 188, 230, 330, this.objectsId, "left");
			this._enemiesLayer.addChild((new e).add(a));
			this.objectsId++;
			this.stopMusic();
			this._gameMusic = this._ctx.pack.getSound("music/btb3_bossfight_v1").loop()
		},
		removeCrashWall: function() {
			this.crashDoors.set_visible(!1)
		},
		ActivateControl: function() {
			this.versionText = new S(new R(this._ctx.pack, "fonts/Messages"));
			this.versionText.setXY(10, 10);
			this._worldLayer.addChild((new e).add(this.versionText));
			this._ctx.controlActivated = !0
		},
		handleKeyUp: function(a) {
			if (!this._isComputerOnScreen && !this._isNewGadgetOnScreen && !this._isNoteOnScreen && !this._isPadlockOnScreen && !this._isWiresPanelOnScreen && !this._isCodePanelOnScreen && !this._isSPOnScreen && !this._isHackPanelOnScreen && !this.player._compMap.BobHero_33._bobMoveElevator && !this.player._compMap.BobHero_33._bobGoToElevator && 0 != (this.player._compMap.Sprite_0._flags & 2) && !this.player._compMap.BobHero_33._bobGoToStair && !this._ctx.isGameEnd && !this._ctx.isPartFinishDoor) {
				var b =
					this.player._compMap.BobHero_33.bobSprite;
				if ("Left" == i.string(a.key) + "" || "A" == i.string(a.key) + "") this.leftKey = !1, !this.leftKey && !this.rightKey && this.player._compMap.BobHero_33.changeAction("stay", b.x._value, b.y._value);
				if ("Right" == i.string(a.key) + "" || "D" == i.string(a.key) + "") this.rightKey = !1, !this.leftKey && !this.rightKey && this.player._compMap.BobHero_33.changeAction("stay", b.x._value, b.y._value);
				if ("Up" == i.string(a.key) + "" || "W" == i.string(a.key) + "") this.actionKey = this.isPlayerTryAction = !1;
				if ("Down" ==
					i.string(a.key) + "" || "S" == i.string(a.key) + "") this.downKey = !1
			} else {
				if ("Left" == i.string(a.key) + "" || "A" == i.string(a.key) + "") this.leftKey = !1;
				if ("Right" == i.string(a.key) + "" || "D" == i.string(a.key) + "") this.rightKey = !1;
				if ("Up" == i.string(a.key) + "" || "W" == i.string(a.key) + "") this.actionKey = !1;
				if ("Down" == i.string(a.key) + "" || "S" == i.string(a.key) + "") this.downKey = !1;
				if (this._isCodePanelOnScreen) {
					if ("Number0" == i.string(a.key) + "" || "Numpad0" == i.string(a.key) + "") this.digit0 = "up";
					if ("Number1" == i.string(a.key) + "" || "Numpad1" ==
						i.string(a.key) + "") this.digit1 = "up";
					if ("Number2" == i.string(a.key) + "" || "Numpad2" == i.string(a.key) + "") this.digit2 = "up";
					if ("Number3" == i.string(a.key) + "" || "Numpad3" == i.string(a.key) + "") this.digit3 = "up";
					if ("Number4" == i.string(a.key) + "" || "Numpad4" == i.string(a.key) + "") this.digit4 = "up";
					if ("Number5" == i.string(a.key) + "" || "Numpad5" == i.string(a.key) + "") this.digit5 = "up";
					if ("Number6" == i.string(a.key) + "" || "Numpad6" == i.string(a.key) + "") this.digit6 = "up";
					if ("Number7" == i.string(a.key) + "" || "Numpad7" == i.string(a.key) +
						"") this.digit7 = "up";
					if ("Number8" == i.string(a.key) + "" || "Numpad8" == i.string(a.key) + "") this.digit8 = "up";
					if ("Number9" == i.string(a.key) + "" || "Numpad9" == i.string(a.key) + "") this.digit9 = "up"
				}
			}
		},
		handleKeyDown: function(a) {
			if (!this._isComputerOnScreen && !this._isNewGadgetOnScreen && !this._isNoteOnScreen && !this._isPadlockOnScreen && !this._isWiresPanelOnScreen && !this._isCodePanelOnScreen && !this._isSPOnScreen && !this._isHackPanelOnScreen && !this.player._compMap.BobHero_33._bobMoveElevator && !this.player._compMap.BobHero_33._bobGoToElevator &&
				0 != (this.player._compMap.Sprite_0._flags & 2) && !this.player._compMap.BobHero_33._bobGoToStair && !this._ctx.isGameEnd && !this._ctx.isPartFinishDoor) {
				var b = this.player._compMap.BobHero_33.bobSprite;
				if ("Left" == i.string(a.key) + "" || "A" == i.string(a.key) + "") this.rightKey && (this.player._compMap.BobHero_33.changeAction("stay", b.x._value, b.y._value), this.rightKey = !1), this.playerDirection = "left", this.leftKey = !0, 1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[0] && this._ctx.currentLevel.tutor.closeTip(1);
				else if ("Right" == i.string(a.key) + "" || "D" == i.string(a.key) + "") this.leftKey && (this.player._compMap.BobHero_33.changeAction("stay", b.x._value, b.y._value), this.leftKey = !1), this.playerDirection = "right", this.rightKey = !0, 1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[0] && this._ctx.currentLevel.tutor.closeTip(1);
				else if (("Up" == i.string(a.key) + "" || "W" == i.string(a.key) + "") && !1 == this.isPlayerTryAction) this.isPlayerTryAction = this.actionKey = !0;
				else if (("Down" == i.string(a.key) + "" ||
						"S" == i.string(a.key) + "") && !1 == this.downKey) this.downKey = !0
			} else {
				if ("Left" == i.string(a.key) + "" || "A" == i.string(a.key) + "") this.rightKey && (this.rightKey = !1), this.playerDirection = "left", this.leftKey = !0, this._isNoteOnScreen && this.closeMessage(), this._isCodePanelOnScreen && this.codePanelActive && this.closeCodePanel(), this._isComputerOnScreen && this.closeComputerScreen(), this._isSPOnScreen && 1 < this._ctx.currentLevelNumber && (this.player._compMap.BobHero_33.currentPadlock._compMap.ChargeBase_6.CloseSaveMessage(),
					this.closeSaveMessage(), this.player._compMap.BobHero_33._bobGoToSave = !1);
				else if ("Right" == i.string(a.key) + "" || "D" == i.string(a.key) + "") this.leftKey && (this.leftKey = !1), this.playerDirection = "right", this.rightKey = !0, this._isNoteOnScreen && this.closeMessage(), this._isCodePanelOnScreen && this.codePanelActive && this.closeCodePanel(), this._isComputerOnScreen && this.closeComputerScreen(), this._isSPOnScreen && 1 < this._ctx.currentLevelNumber && (this.player._compMap.BobHero_33.currentPadlock._compMap.ChargeBase_6.CloseSaveMessage(),
					this.closeSaveMessage(), this.player._compMap.BobHero_33._bobGoToSave = !1);
				else if ("Up" == i.string(a.key) + "" || "W" == i.string(a.key) + "") this.actionKey = !0;
				else if ("Down" == i.string(a.key) + "" || "S" == i.string(a.key) + "") this.downKey = !0;
				if (this._isCodePanelOnScreen) {
					if ("Number0" == i.string(a.key) + "" || "Numpad0" == i.string(a.key) + "") this.digit0 = "down";
					if ("Number1" == i.string(a.key) + "" || "Numpad1" == i.string(a.key) + "") this.digit1 = "down";
					if ("Number2" == i.string(a.key) + "" || "Numpad2" == i.string(a.key) + "") this.digit2 = "down";
					if ("Number3" == i.string(a.key) + "" || "Numpad3" == i.string(a.key) + "") this.digit3 = "down";
					if ("Number4" == i.string(a.key) + "" || "Numpad4" == i.string(a.key) + "") this.digit4 = "down";
					if ("Number5" == i.string(a.key) + "" || "Numpad5" == i.string(a.key) + "") this.digit5 = "down";
					if ("Number6" == i.string(a.key) + "" || "Numpad6" == i.string(a.key) + "") this.digit6 = "down";
					if ("Number7" == i.string(a.key) + "" || "Numpad7" == i.string(a.key) + "") this.digit7 = "down";
					if ("Number8" == i.string(a.key) + "" || "Numpad8" == i.string(a.key) + "") this.digit8 = "down";
					if ("Number9" ==
						i.string(a.key) + "" || "Numpad9" == i.string(a.key) + "") this.digit9 = "down"
				}
			}
		},
		checkLeftWall: function() {
			for (var a = 0, b = this._walls.length; a < b;) {
				if (Math.abs(this._walls[a].px - this.player._compMap.BobHero_33.bobSprite.x._value) < 30 * this._ctx.currentScaleCoef && this._walls[a].px < this.player._compMap.BobHero_33.bobSprite.x._value && Math.abs(this._walls[a].py - this.player._compMap.BobHero_33.getY()) < 40 * this._ctx.currentScaleCoef) return this.player._compMap.BobHero_33.changeAction("stay", this.player._compMap.BobHero_33.bobSprite.x._value,
					this.player._compMap.BobHero_33.bobSprite.y._value), !0;
				++a
			}
			return !1
		},
		checkRightWall: function() {
			for (var a = 0, b = this._walls.length; a < b;) {
				if (Math.abs(this._walls[a].px - this.player._compMap.BobHero_33.bobSprite.x._value) < 30 * this._ctx.currentScaleCoef && this._walls[a].px > this.player._compMap.BobHero_33.bobSprite.x._value && Math.abs(this._walls[a].py - this.player._compMap.BobHero_33.getY()) < 40 * this._ctx.currentScaleCoef) return this.player._compMap.BobHero_33.changeAction("stay", this.player._compMap.BobHero_33.bobSprite.x._value,
					this.player._compMap.BobHero_33.bobSprite.y._value), !0;
				++a
			}
			return !1
		},
		checkLeftSidedoor: function() {
			for (var a = 0, b = this._sidedoors.length; a < b;) {
				if (Math.abs(this._sidedoors[a]._x - this.player._compMap.BobHero_33.bobSprite.x._value) < 30 * this._ctx.currentScaleCoef && this._sidedoors[a]._x < this.player._compMap.BobHero_33.bobSprite.x._value && Math.abs(this._sidedoors[a]._y - this.player._compMap.BobHero_33.getY()) < 40 * this._ctx.currentScaleCoef && "close" == this._sidedoors[a].isDoor) return this.player._compMap.BobHero_33.changeAction("stay",
					this.player._compMap.BobHero_33.bobSprite.x._value, this.player._compMap.BobHero_33.bobSprite.y._value), !0;
				++a
			}
			return !1
		},
		checkRightSidedoor: function() {
			for (var a = 0, b = this._sidedoors.length; a < b;) {
				if (Math.abs(this._sidedoors[a]._x - this.player._compMap.BobHero_33.bobSprite.x._value) < 30 * this._ctx.currentScaleCoef && this._sidedoors[a]._x > this.player._compMap.BobHero_33.bobSprite.x._value && Math.abs(this._sidedoors[a]._y - this.player._compMap.BobHero_33.getY()) < 40 * this._ctx.currentScaleCoef && "close" == this._sidedoors[a].isDoor) return this.player._compMap.BobHero_33.changeAction("stay",
					this.player._compMap.BobHero_33.bobSprite.x._value, this.player._compMap.BobHero_33.bobSprite.y._value), !0;
				++a
			}
			return !1
		},
		alertUp: function() {
			for (var a = 0, b = this._cameras.length; a < b;) this._cameras[a].alertUp(), ++a;
			this.globalState = "alertTimer"
		},
		FindAndDeactivateObject: function(a) {
			for (var b = 0, c = this._lasers.length; b < c;) {
				if (this._lasers[b].laserName == a) {
					this._objectsLayer.removeChild(this._lasers[b].owner);
					this._lasers[b].deactivateLaser();
					break
				}++b
			}
		},
		FindAndOpenDoor: function(a) {
			for (var b = 0, c = this._stairs.length; b <
				c;) {
				if (this._stairs[b].doorName == a) {
					this._stairs[b].openDoor();
					break
				}++b
			}
			b = 0;
			for (c = this._sidedoors.length; b < c;) {
				if (this._sidedoors[b].doorName == a) {
					this._sidedoors[b].openDoor();
					break
				}++b
			}
			b = 0;
			for (c = this._elevators.length; b < c;) {
				if (this._elevators[b].doorName == a) {
					this._elevators[b].openDoors();
					break
				}++b
			}
		},
		FindStairToTeleport: function(a) {
			for (var b = 0, c = this._stairs.length; b < c;) {
				if (!this._stairs[b].isStairFind && this._stairs[b].groupID == a) {
					this._currentStairNumber = b;
					break
				}++b
			}
		},
		TeleportBobToStair: function(a) {
			this.player._compMap.Sprite_0.setXY(this._stairs[this._currentStairNumber]._spriteDoor.x._value,
				this._stairs[this._currentStairNumber]._spriteDoor.y._value + this._stairCoefY);
			"StairUp" == a && this.player._compMap.Sprite_0.y.animate(this.player._compMap.Sprite_0.y._value - 10 * this._ctx.currentScaleCoef, this.player._compMap.Sprite_0.y._value, 0.4, l.linear);
			"StairDown" == a && this.player._compMap.Sprite_0.y.animate(this.player._compMap.Sprite_0.y._value + 10 * this._ctx.currentScaleCoef, this.player._compMap.Sprite_0.y._value, 0.4, l.linear)
		},
		SetPlayerBack: function() {
			this.player._compMap.Sprite_0.set_visible(!1)
		},
		SetPlayerFront: function() {
			this._bobShadow.set_visible(!1);
			this._elevators[this._currentStairNumber].openDoor()
		},
		FindAndSendBobToElevator: function(a) {
			for (var b = 0, c = this._elevators.length; b < c;) {
				if ("open" == this._elevators[b].isDoor && this._elevators[b].groupID == this._currentStairNumber) {
					this._currentStairNumber = b;
					break
				}++b
			}
			this._elevators[this._currentStairNumber].closeDoor();
			this._bobShadow.setXY(a, this.player._compMap.Sprite_0.y._value);
			this.player._compMap.Sprite_0.setXY(this._elevators[this._currentStairNumber]._elevatorBack.x._value,
				this._elevators[this._currentStairNumber]._elevatorBack.y._value + this._stairCoefY);
			this.moveToElevator(this._bobShadow.y._value, this._elevators[this._currentStairNumber]._elevatorBack.y._value + this._elevCoefY)
		},
		moveToElevator: function(a, b) {
			this._bobShadow.set_visible(!0);
			this._startCoor = a;
			this._finishCoor = b;
			this._elevatorSpeed = this._startCoor < this._finishCoor ? 1.9 * this._ctx.gameScale : -1.9 * this._ctx.gameScale;
			this._timerElev = 0;
			this._bobMove = !0
		},
		generateDoorCode: function() {
			var a = Math.floor(2 * Math.random());
			return 0 == a ? "0" + (Math.floor(8 * Math.random()) + 1) + ("" + (Math.floor(8 * Math.random()) + 1)) + "0" : 1 == a ? "" + (Math.floor(8 * Math.random()) + 1) + "0" + ("" + (Math.floor(8 * Math.random()) + 1)) + "0" : 2 == a ? "0" + (Math.floor(8 * Math.random()) + 1) + "0" + ("" + (Math.floor(8 * Math.random()) + 1)) : "0" + (Math.floor(8 * Math.random()) + 1) + ("" + (Math.floor(8 * Math.random()) + 1)) + "0"
		},
		showMessage: function(a) {
			for (var b = "1111", c = 0, h = this._codepads.length; c < h;) {
				if (a == this._codepads[c].doorName) {
					b = this._codepads[c].getPass();
					this._codepads[c].seeIt = !0;
					break
				}++c
			}!1 ==
				this._isNoteOnScreen && (this._note = ed.create(this._ctx, "Door code: \n", b), this._tipsLayer.addChild(this._note), this._isNoteOnScreen = !0, this._ctx.pack.getSound("sounds/open_paper").play())
		},
		closeMessage: function() {
			this._tipsLayer.removeChild(this._note);
			this._note.dispose();
			this._isNoteOnScreen = !1;
			this._note = null
		},
		showNewGadget: function(a) {
			!1 == this._isNewGadgetOnScreen && (this._newGadget = fd.create(this._ctx, a), this._tipsLayer.addChild(this._newGadget), this._isNewGadgetOnScreen = !0, this._ctx.pack.getSound("sounds/new_gadget").play())
		},
		closeNewGadget: function() {
			this._tipsLayer.removeChild(this._newGadget);
			this._newGadget.dispose();
			this._isNewGadgetOnScreen = !1;
			this._newGadget = null
		},
		closeSaveMessage: function() {
			1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[5] && this._ctx.currentLevel.tutor.closeTip(6);
			this._tipsLayer.removeChild(this._savePoint);
			this._savePoint.dispose();
			this._isSPOnScreen = !1;
			this._savePoint = null
		},
		saveDoorCodes: function() {
			for (var a = 0, b = this._codepads.length; a < b;) this._codepads[a].seeIt &&
				this._ctx.levelCodes.push(new pc(this._codepads[a].doorName, this._codepads[a].getPass())), ++a
		},
		showComputerScreen: function(a) {
			for (var b = "1111", c = 0, h = this._codepads.length; c < h;) {
				if (a == this._codepads[c].doorName) {
					b = this._codepads[c].getPass();
					this._codepads[c].seeIt = !0;
					break
				}++c
			}!1 == this._isComputerOnScreen && (this._isComputerOnScreen = !0, a = new Fb(this._ctx, a, b), this._computerScreen = (new e).add(a), this._tipsLayer.addChild(this._computerScreen), this._ctx.pack.getSound("sounds/computer_load").play())
		},
		closeComputerScreen: function() {
			this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !1;
			this._tipsLayer.removeChild(this._computerScreen);
			this._computerScreen.disposeChildren();
			this._computerScreen.dispose();
			this._isComputerOnScreen = !1;
			this._computerScreen = null
		},
		showCodePanel: function(a, b) {
			if (!1 == this._isCodePanelOnScreen) {
				this._isCodePanelOnScreen = this.codePanelActive = !0;
				var c = new Gb(this._ctx, a, b);
				this._codePanel = (new e).add(c);
				this._tipsLayer.addChild(this._codePanel);
				this._ctx.pack.getSound("sounds/code_panel").play()
			}
		},
		closeCodePanel: function() {
			this._tipsLayer.removeChild(this._codePanel);
			this._codePanel.disposeChildren();
			this._codePanel.dispose();
			this._isCodePanelOnScreen = !1;
			this._codePanel = null
		},
		showHackPanel: function(a) {
			!1 == this._isHackPanelOnScreen && (this._isHackPanelOnScreen = !0, a = new Hb(this._ctx, a), this._hackPanel = (new e).add(a), this._tipsLayer.addChild(this._hackPanel))
		},
		closeHackPanel: function() {
			this._tipsLayer.removeChild(this._hackPanel);
			this._hackPanel.disposeChildren();
			this._hackPanel.dispose();
			this._isHackPanelOnScreen = !1;
			this._hackPanel = null
		},
		showWiresPanel: function(a, b) {
			!1 == this._isWiresPanelOnScreen && (this._isWiresPanelOnScreen = !0, this.wPanel.setName(a, b), this._wiresPanel = (new e).add(this.wPanel), this._tipsLayer.addChild(this._wiresPanel), this._ctx.pack.getSound("sounds/electric_cabinet_open").play())
		},
		closeWiresPanel: function(a) {
			a && this.player._compMap.BobHero_33.currentPadlock._compMap.Electric_39.electricOpen();
			this._tipsLayer.removeChild(this._wiresPanel);
			this._wiresPanel.disposeChildren();
			this._wiresPanel.dispose();
			this._isWiresPanelOnScreen = !1;
			this._wiresPanel = null
		},
		showPadlock: function(a, b, c) {
			!1 == this._isPadlockOnScreen && (a = new Ib(this._ctx, a, b, c), this._padlock = (new e).add(a), this._tipsLayer.addChild(this._padlock), this._isPadlockOnScreen = !0)
		},
		closePadlock: function() {
			this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !1;
			this._tipsLayer.removeChild(this._padlock);
			this._padlock.dispose();
			this._isPadlockOnScreen = !1;
			this._padlock = null
		},
		gameOver: function() {
			this.stopMusic();
			this._ctx.isGameEnd = !0;
			this.player._compMap.BobHero_33.changeAction("fear");
			this._ctx.pack.getSound("sounds/alarm").play(1)
		},
		calcStars: function() {
			this._ctx.levelsStatus[this._ctx.currentLevelNumber - 1] = 2;
			10 > this._ctx.currentLevelNumber && (this._ctx.levelsStatus[this._ctx.currentLevelNumber] = 1);
			var a = this._ctx.batteryCollected1 + this._ctx.batteryCollected2 + this._ctx.batteryCollected3;
			this._ctx.docsPickedOnLevel = a;
			var b = this._ctx.getStars(this.watch._value, this._ctx.currentLevelNumber);
			this._ctx.starsForLevelCompletedScreen = b;
			this._ctx.levelStars[this._ctx.currentLevelNumber -
				1] < b && (this._ctx.levelStars[this._ctx.currentLevelNumber - 1] = b);
			this._ctx.saveGameData();
			a > this._ctx.batteriesInLevels[this._ctx.currentLevelNumber - 1] && (this._ctx.batteriesInLevels[this._ctx.currentLevelNumber - 1] = a)
		},
		stopMusic: function() {
			this._gameMusic.dispose();
			this.player._compMap.BobHero_33.removePlayer()
		},
		getXMLFromFile: function() {
			return 2 == this._ctx.currentLevelPart ? this._ctx.pack.getFile("level" + this._ctx.currentLevelNumber + "2.xml").toString() : 3 == this._ctx.currentLevelPart ? this._ctx.pack.getFile("level" +
				this._ctx.currentLevelNumber + "3.xml").toString() : this._ctx.pack.getFile("level" + this._ctx.currentLevelNumber + ".xml").toString()
		},
		__class__: vb
	});
	var Ta = function() {
		this.length = 0
	};
	f.List = Ta;
	Ta.__name__ = ["List"];
	Ta.prototype = {
		add: function(a) {
			a = [a];
			null == this.h ? this.h = a : this.q[1] = a;
			this.q = a;
			this.length++
		},
		iterator: function() {
			return {
				h: this.h,
				hasNext: function() {
					return null != this.h
				},
				next: function() {
					if (null == this.h) return null;
					var a = this.h[0];
					this.h = this.h[1];
					return a
				}
			}
		},
		__class__: Ta
	};
	var Jb = function(a) {
		this._ctx =
			a
	};
	f.LogoMenu = Jb;
	Jb.__name__ = ["LogoMenu"];
	Jb.__super__ = n;
	Jb.prototype = q(n.prototype, {
		get_name: function() {
			return "LogoMenu_35"
		},
		onAdded: function() {
			this._spriteBob = new g(this._ctx.pack.getTexture("gameLogo"));
			this.owner.add(this._spriteBob);
			this._spriteBob.setXY(0.5 * k._platform.getStage().get_width(), 0.2 * k._platform.getStage().get_height());
			this._spriteBob.centerAnchor();
			this._spriteBob.setScale(this._ctx.gameScale)
		},
		onUpdate: function() {},
		__class__: Jb
	});
	var gd = function() {};
	f.Main = gd;
	gd.__name__ = ["Main"];
	gd.main = function() {
		loaderHelper.hide();
		k.init();
		var a = new Kb;
		k.root.add(a);
		var b = D.fromAssets("preloader");
		k._platform.loadAssetPack(b).get(function(b) {
			k.loadAssetPack(D.fromAssetsLocalized("locale")).get(function(h) {
				var d = k.loadAssetPack(D.fromAssets("main"));
				d.get(function(d) {
					(new oc(d, h, a)).enterHomeScene(!1);
					b.dispose()
				});
				d = hd.create(b, d);
				a.unwindToScene(d)
			})
		})
	};
	var qc = function() {};
	f.IMap = qc;
	qc.__name__ = ["IMap"];
	Math.__name__ = ["Math"];
	var Cb = function(a, b, c, h, d) {
		this._isBalloonShow = !1;
		this._ctx =
			a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._messageAbout = h;
		this._doorName = d
	};
	f.Message = Cb;
	Cb.__name__ = ["Message"];
	Cb.__super__ = n;
	Cb.prototype = q(n.prototype, {
		get_name: function() {
			return "Message_41"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("gameObjects/message");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock && this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x, this._y);
			this._spritePadlock.centerAnchor()
		},
		onUpdate: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay",
				this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showMessage(this._doorName)));
			this.isStairFind = !1;
			if (Math.abs(this._spritePadlock.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spritePadlock.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonMessage"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", a._ctx.currentLevel.player._compMap.Sprite_0.x._value,
						a._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					a._ctx.currentLevel.showMessage(a._doorName)
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		__class__: Cb
	});
	var Bb = function(a, b, c, h, d, s, e) {
		this._isBalloonShow = !1;
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._doorName = h;
		this._direction = d;
		this._difLevel = s;
		this._objId = e
	};
	f.Padlock = Bb;
	Bb.__name__ = ["Padlock"];
	Bb.__super__ = n;
	Bb.prototype = q(n.prototype, {
		get_name: function() {
			return "Padlock_40"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("gameObjects/padlock");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock && this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x, this._y);
			this._spritePadlock.centerAnchor();
			"left" == this._direction && this._spritePadlock.scaleX.set__(-1 *
				Math.abs(this._spritePadlock.scaleX._value));
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this._objId == this.objectsForSave[a].eId) {
						this.openDoorIfSave();
						break
					}++a
				}
			}
		},
		onUpdate: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon &&
				(i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.actionKey = !1, 2 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[7] && this._ctx.currentLevel.tutor.closeTip(8), 4 == this._ctx.currentLevelNumber &&
					1 == this._ctx.currentLevel.tutor.tipsActivate[8] && this._ctx.currentLevel.tutor.closeTip(9), this._ctx.haveLockpick && (this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showPadlock(this._doorName, this._difLevel, this._objId), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock =
						this.owner, this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = this._currentBalloon)));
			this.isStairFind = !1;
			if (Math.abs(this._spritePadlock.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 20 * this._ctx.currentScaleCoef && Math.abs(this._spritePadlock.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b;
				b = this._ctx.haveLockpick ?
					new g(this._ctx.pack.getTexture("BalloonLockpick")) : new g(this._ctx.pack.getTexture("BalloonNone"));
				1 == this._ctx.currentLevelNumber && 0 == this._ctx.currentLevel.tutor.tipsActivate[4] && !this._ctx.haveLockpick && this._ctx.currentLevel.tutor.showTip(5);
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
					70 * this._ctx.currentScaleCoef);
				this._ctx.haveLockpick && b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0;
					a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", a._ctx.currentLevel.player._compMap.Sprite_0.x._value, a._ctx.currentLevel.player._compMap.Sprite_0.y._value);
					a._ctx.currentLevel.showPadlock(a._doorName, a._difLevel, a._objId);
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon =
						a._currentBalloon
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), 1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[4] && !this._ctx.haveLockpick && this._ctx.currentLevel.tutor.closeTip(5))
		},
		openDoorIfSave: function() {
			this._ctx.currentLevel.FindAndOpenDoor(this._doorName);
			this.owner.disposeChildren();
			this.owner.dispose();
			this.owner = null
		},
		__class__: Bb
	});
	var Ra = function(a, b, c, h, d) {
		this._movieTimerStop = 1;
		this._movieTimer = 0;
		this._isBalloonShow = !1;
		this._ctx = b;
		this._stairName = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this.isDoor = "close";
		this._part = d;
		this._targetX = c - 20;
		this._targetY = h - 20
	};
	f.PartDoor = Ra;
	Ra.__name__ = ["PartDoor"];
	Ra.__super__ = n;
	Ra.prototype = q(n.prototype, {
		get_name: function() {
			return "PartDoor_16"
		},
		onAdded: function() {
			var a = new g(this._ctx.pack.getTexture("gameObjects/elevatorBack"));
			a.setScale(this._ctx.gameScale);
			a.setXY(this._x,
				this._y);
			a.centerAnchor();
			this._ctx.currentLevel._backLayer.addChild((new e).add(a));
			this._bobElev = new g(this._ctx.pack.getTexture("BobElev"));
			this.owner.addChild((new e).add(this._bobElev));
			this._bobElev.setScale(this._ctx.gameScale);
			this._bobElev.setXY(this._x + 3 * this._ctx.currentScaleCoef, this._y);
			this._bobElev.centerAnchor();
			this._bobElev.set_visible(!1);
			this._spriteDoor = new g(this._ctx.pack.getTexture("gameObjects/door1"));
			this.owner.addChild((new e).add(this._spriteDoor));
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor();
			this._ctx.currentLevel.exitTarget = new wa(this._ctx, this._targetX, this._targetY, "exit");
			this._ctx.currentLevel._lightsLayer.addChild((new e).add(this._ctx.currentLevel.exitTarget))
		},
		onUpdate: function(a) {
			var b = this;
			"closeEnd" == this.isDoor && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.isDoor = "done", this._ctx.levelTimer = this._ctx.currentLevel.watch._value, 2 == this._part && (this._ctx.currentLevelPart =
				2, this._ctx.currentLevel.stopMusic(), this._ctx.currentLevel.restart.set__(!0), this._ctx.director.unwindToScene(this._ctx.currentGameScene), this._ctx.loadNextPartOfScene()), 3 == this._part && (this._ctx.currentLevelPart = 3, this._ctx.currentLevel.stopMusic(), this._ctx.currentLevel.restart.set__(!0), this._ctx.director.unwindToScene(this._ctx.currentGameScene), this._ctx.loadNextPartOfScene())));
			"open" == this.isDoor && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.isDoor =
				"done", this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("partIn", this._x, this._ctx.currentLevel.player._compMap.Sprite_0.y._value)));
			"openOut" == this.isDoor && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.isDoor = "done", this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("partOut", this._x, this._y), this._bobElev.set_visible(!1), this._ctx.currentLevel.player._compMap.Sprite_0.set_visible(!0)));
			0 != (this._bobElev._flags & 2) && (this._movieTimer +=
				a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0));
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.batteriesInLevel = this._ctx.currentLevel.batery._value, this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0, this._ctx.currentLevel.exitTarget.hideTarget(), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this.openDoor(), null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())));
			this.isStairFind = !1;
			Math.abs(this._spriteDoor.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spriteDoor.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) <
				30 * this._ctx.currentScaleCoef && "close" == this.isDoor && !this._ctx.kickFirst && (this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && (this._isBalloonShow = !0, a = new g(this._ctx.pack.getTexture("BalloonStair")), this._currentBalloon = (new e).add(a), this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon), a.setScale(this._ctx.gameScale), a.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
					70 * this._ctx.currentScaleCoef), a.get_pointerDown().connect(function() {
					b._ctx.batteriesInLevel = b._ctx.currentLevel.batery._value;
					b._ctx.currentLevel.player._compMap.BobHero_33._bobBusy = !0;
					b._ctx.currentLevel.exitTarget.hideTarget();
					b._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = b.owner;
					b.openDoor();
					null != b._currentBalloon && (b._isBalloonShow = !1, b._ctx.currentLevel._plashkaLayer.removeChild(b._currentBalloon), b._currentBalloon.dispose())
				})));
			!1 == this.isStairFind && null != this._currentBalloon &&
				(this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose())
		},
		openDoor: function() {
			this._ctx.isPartFinishDoor = !0;
			this.isDoor = "open";
			this._movieTimer = 0;
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("yes2", this._x, this._ctx.currentLevel.player._compMap.Sprite_0.y._value);
			this._spriteDoor.x.animate(this._x, this._x + 60 * this._ctx.currentScaleCoef, 0.5, l.linear);
			this._ctx.pack.getSound("sounds/final_door_open").play(1)
		},
		closeDoor: function() {
			this._movieTimer =
				0;
			this._movieTimerStop = 2;
			this._ctx.currentLevel.player._compMap.Sprite_0.set_visible(!1);
			this._bobElev.set_visible(!0);
			this._spriteDoor.x.animate(this._x + 60 * this._ctx.currentScaleCoef, this._x, 0.5, l.linear);
			this.isDoor = "closeEnd";
			this._ctx.pack.getSound("sounds/final_door_close").play(1)
		},
		closeDoorOut: function() {
			this._spriteDoor.x.animate(this._x + 60 * this._ctx.currentScaleCoef, this._x, 0.5, l.linear);
			this.isDoor = "close";
			this._ctx.pack.getSound("sounds/final_door_close").play(1)
		},
		__class__: Ra
	});
	var N =
		function() {};
	f.Reflect = N;
	N.__name__ = ["Reflect"];
	N.field = function(a, b) {
		try {
			return a[b]
		} catch (c) {
			return null
		}
	};
	N.fields = function(a) {
		var b = [];
		if (null != a) {
			var c = Object.prototype.hasOwnProperty,
				h;
			for (h in a) "__id__" != h && "hx__closures__" != h && c.call(a, h) && b.push(h)
		}
		return b
	};
	N.isFunction = function(a) {
		return "function" == typeof a && !(a.__name__ || a.__ename__)
	};
	N.deleteField = function(a, b) {
		if (!Object.prototype.hasOwnProperty.call(a, b)) return !1;
		delete a[b];
		return !0
	};
	var Eb = function(a, b, c, h, d, s) {
		this._switchCamera =
			this._seeEnemyLeft = this._seeEnemyRight = !1;
		this._timerWarning = this._timerSwitch = 0;
		this._isChilled = !0;
		this._timerToChill = 0;
		this._isBobInFocus = !1;
		this._cameraState = "free";
		this.direction = "right";
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = (c - 12 * a.gameMagnify) * this._ctx.gameScale;
		this._cameraDelay = h;
		this._viewL = this._x - d * this._ctx.gameScale;
		this._viewR = this._x + s * this._ctx.gameScale;
		this._timerCount = 0
	};
	f.SecurityCamera = Eb;
	Eb.__name__ = ["SecurityCamera"];
	Eb.__super__ = n;
	Eb.prototype = q(n.prototype, {
		get_name: function() {
			return "SecurityCamera_18"
		},
		onAdded: function() {
			var a = this,
				b = this._ctx.pack.getTexture("gameObjects/camera0001");
			this._sprite = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._sprite && this.owner.add(this._sprite = new g(b));
			this._sprite.texture = b;
			this._sprite.setScale(this._ctx.gameScale);
			this._sprite.setXY(this._x, this._y);
			b = new la;
			b.run(new ma(new na([new oa(this._cameraDelay), new pa(function() {
				"free" == a._cameraState && a._isChilled && ("left" == a.direction ? (a._sprite.scaleX.set__(Math.abs(a._sprite.scaleX._value)), a._sprite.setXY(a._x -
					7 * a._ctx.currentScaleCoef, a._y), a.direction = "right") : (a._sprite.scaleX.set__(-1 * Math.abs(a._sprite.scaleX._value)), a._sprite.setXY(a._x + 7 * a._ctx.currentScaleCoef, a._y), a.direction = "left"), a._switchCamera = !0, a._sprite.texture = a._ctx.pack.getTexture("gameObjects/cameraFront"))
			})])));
			this.owner.add(b);
			this._sign = new ea(this._ctx, this._x, this._y - 14 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel._screensLayer.addChild((new e).add(this._sign))
		},
		onUpdate: function(a) {
			"alertLaser" != this._cameraState &&
				(this._switchCamera && (this._timerSwitch += a, 0.1 < this._timerSwitch && (this._switchCamera = !1, this._timerSwitch = 0, "alert" == this._cameraState && (this._sprite.texture = this._ctx.pack.getTexture("gameObjects/camera0003")))), "alert" == this._cameraState && !this._isBobInFocus && !this._switchCamera && (this._timerCount += a, 0.5 < this._timerCount && (this._timerCount = 0, "left" == this.direction ? (this._sprite.scaleX.set__(Math.abs(this._sprite.scaleX._value)), this._sprite.setXY(this._x - 7 * this._ctx.currentScaleCoef, this._y), this.direction =
						"right") : (this._sprite.scaleX.set__(-1 * Math.abs(this._sprite.scaleX._value)), this._sprite.setXY(this._x + 7 * this._ctx.currentScaleCoef, this._y), this.direction = "left"), this._switchCamera = !0, this._sprite.texture = this._ctx.pack.getTexture("gameObjects/cameraFront"))), this._isChilled || (this._timerToChill += a, 1.5 < this._timerToChill && (this._timerToChill = 0, this._isChilled = !0, this._sign.stopAction())), (this.checkCameraLeftSide() || this.checkCameraRightSide() || this._seeEnemyLeft || this._seeEnemyRight) && !this._switchCamera &&
					!this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow ? ("free" == this._cameraState && (this._cameraState = "warning", this._sign.changeAction("_SignB"), this._sprite.texture = this._ctx.pack.getTexture("gameObjects/camera0002"), this._timerWarning += this._timerToChill, this._isChilled = !1), "warning" == this._cameraState && (this._timerWarning += a, 1.5 < this._timerWarning && (this._cameraState = "alert", this._ctx.currentLevel.globalState = "alert", this._ctx.isGameEnd || this._ctx.currentLevel.gameOver(), this._sign.changeAction("_SignA"),
						this._sprite.texture = this._ctx.pack.getTexture("gameObjects/camera0003"))), this._isBobInFocus = !0, this._ctx.currentLevel.talert.set__(5)) : (this._timerWarning = 0, this._isBobInFocus = !1, "alert" == this._cameraState ? this._ctx.currentLevel.globalState = "alertTimer" : this._switchCamera || this.resetCamera()))
		},
		checkCameraLeftSide: function() {
			return this._ctx.currentLevel.player._compMap.Sprite_0.x._value + 15 * this._ctx.currentScaleCoef < this._x && Math.abs(this._ctx.currentLevel.player._compMap.BobHero_33.getY() - (this._y +
				25 * this._ctx.currentScaleCoef)) < 30 * this._ctx.currentScaleCoef && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL && "left" == this.direction ? !0 : !1
		},
		checkCameraRightSide: function() {
			return this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 30 * this._ctx.currentScaleCoef > this._x && Math.abs(this._ctx.currentLevel.player._compMap.BobHero_33.getY() - (this._y + 25 * this._ctx.currentScaleCoef)) < 30 * this._ctx.currentScaleCoef && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._viewR &&
				"right" == this.direction ? !0 : !1
		},
		checkEnemyLeftSide: function(a) {
			this._seeEnemyLeft = a + 15 * this._ctx.currentScaleCoef < this._x && a > this._viewL && "left" == this.direction ? !0 : !1
		},
		checkEnemyRightSide: function(a) {
			this._seeEnemyRight = a - 15 * this._ctx.currentScaleCoef > this._x && a < this._viewR && "right" == this.direction ? !0 : !1
		},
		getYPos: function() {
			return this._y + 25 * this._ctx.currentScaleCoef
		},
		alertUp: function() {
			this._timerCount = 0;
			this._sign.changeAction("_SignA");
			this._cameraState = "alertLaser";
			this._sprite.texture = this._ctx.pack.getTexture("gameObjects/camera0003");
			this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._x ? (this._sprite.scaleX.set__(-1 * Math.abs(this._sprite.scaleX._value)), this._sprite.setXY(this._x - 7 * this._ctx.currentScaleCoef, this._y)) : (this._sprite.scaleX.set__(Math.abs(this._sprite.scaleX._value)), this._sprite.setXY(this._x + 7 * this._ctx.currentScaleCoef, this._y))
		},
		resetCamera: function() {
			this._cameraState = "free";
			this._sprite.texture = this._ctx.pack.getTexture("gameObjects/camera0001")
		},
		__class__: Eb
	});
	var Db = function(a, b, c, h) {
		this._ctx =
			a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this._shadowWidth = h
	};
	f.Shadow = Db;
	Db.__name__ = ["Shadow"];
	Db.__super__ = n;
	Db.prototype = q(n.prototype, {
		get_name: function() {
			return "Shadow_17"
		},
		onAdded: function() {
			var a = this._ctx.pack.getTexture("monitor/computer");
			this._spritePadlock = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spritePadlock && this.owner.add(this._spritePadlock = new g(a));
			this._spritePadlock.texture = a;
			this._spritePadlock.setScale(this._ctx.gameScale);
			this._spritePadlock.setXY(this._x,
				this._y);
			this._spritePadlock.centerAnchor()
		},
		onUpdate: function() {
			this.isStairFind = !1;
			Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < this._shadowWidth * this._ctx.gameScale && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow && "stay" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy &&
				!this._ctx.currentLevel.leftKey && !this._ctx.currentLevel.rightKey && (this.isStairFind = !0, this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("shadowIn"))
		},
		checkEnemyInShadow: function() {
			return Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < this._shadowWidth * this._ctx.gameScale ? !0 : !1
		},
		getYPos: function() {
			return this._y
		},
		__class__: Db
	});
	var Ab = function(a, b, c, h, d) {
		this._ctx = a;
		this._x = b * this._ctx.gameScale;
		this._y = c * this._ctx.gameScale;
		this.isDoor = h;
		this.doorName = d
	};
	f.Sidedoor = Ab;
	Ab.__name__ = ["Sidedoor"];
	Ab.__super__ = n;
	Ab.prototype = q(n.prototype, {
		get_name: function() {
			return "Sidedoor_12"
		},
		onAdded: function() {
			var a;
			a = 7 < this._ctx.currentLevelNumber ? this._ctx.pack.getTexture("gameObjects/sidedoor2") : this._ctx.pack.getTexture("gameObjects/sidedoor");
			this._spriteDoor = i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spriteDoor && this.owner.add(this._spriteDoor = new g(a));
			this._spriteDoor.texture = a;
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x,
				this._y);
			this._spriteDoor.centerAnchor()
		},
		onUpdate: function() {},
		openDoor: function() {
			this.isDoor = "open";
			this._ctx.currentLevel._objectsLayer.removeChild(this.owner);
			this.owner.disposeChildren();
			this.owner.dispose()
		},
		__class__: Ab
	});
	var ea = function(a, b, c) {
		this._ctx = a;
		this._x = b;
		this._y = c
	};
	f.Sign = ea;
	ea.__name__ = ["Sign"];
	ea.__super__ = n;
	ea.prototype = q(n.prototype, {
		get_name: function() {
			return "Sign_19"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "effectsAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite = new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.enemySprite.set_pointerEnabled(!1)
		},
		changeAction: function(a) {
			"_SignB" == a && this._ctx.pack.getSound("sounds/alert1").play();
			"_SignA" == a && this._ctx.pack.getSound("sounds/alert2").play();
			this.enemySprite.set_visible(!0);
			this._moviePlayer.loop(a, !0)
		},
		stopAction: function() {
			this.enemySprite.set_visible(!1)
		},
		setCoor: function(a, b) {
			this.enemySprite.setXY(a, b)
		},
		__class__: ea
	});
	var yb = function(a, b, c, h, d, s, e, g) {
		this._isBalloonShow = !1;
		this._ctx = b;
		this._stairName = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this.groupID = d;
		this.isDoor = s;
		this.doorName = e;
		this._doorType = g
	};
	f.Stair = yb;
	yb.__name__ = ["Stair"];
	yb.__super__ = n;
	yb.prototype = q(n.prototype, {
		get_name: function() {
			return "Stair_13"
		},
		onAdded: function() {
			var a;
			a = "open" == this.isDoor ? this._ctx.pack.getTexture(this._stairName) : this._ctx.pack.getTexture("gameObjects/" + this._doorType);
			this._spriteDoor =
				i.instance(this.owner._compMap.Sprite_0, g);
			null == this._spriteDoor && this.owner.add(this._spriteDoor = new g(a));
			this._spriteDoor.texture = a;
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor()
		},
		onUpdate: function() {
			var a = this;
			this.isStairFind = !1;
			if (Math.abs(this._spriteDoor.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spriteDoor.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) <
				30 * this._ctx.currentScaleCoef && "open" == this.isDoor && !this._ctx.kickFirst && !this._ctx.isGameEnd && (this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy)) {
				this._isBalloonShow = !0;
				this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair = !0;
				this._ctx.currentLevel.player._compMap.BobHero_33._stairGroupId = this.groupID;
				this._ctx.currentLevel.player._compMap.BobHero_33._stairName = this._stairName;
				this._ctx.currentLevel.player._compMap.BobHero_33._stairX = this._x;
				1 == this._ctx.currentLevelNumber && 0 == this._ctx.currentLevel.tutor.tipsActivate[1] && this._ctx.currentLevel.tutor.showTip(2);
				var b = new g(this._ctx.pack.getTexture("BalloonStair"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon);
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
					70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody ? a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : (a._ctx.currentLevel.FindStairToTeleport(a.groupID), a._ctx.currentLevel.player._compMap.BobHero_33.changeAction(a._stairName, a._x, a._ctx.currentLevel.player._compMap.Sprite_0.y._value));
					14 == a.groupID && a._ctx.currentLevel.removeCrashWall();
					null != a._currentBalloon && (a._isBalloonShow = !1, a._ctx.currentLevel._plashkaLayer.removeChild(a._currentBalloon),
						a._currentBalloon.dispose())
				})
			}
			if (this._isBalloonShow && null != this._currentBalloon) {
				i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				if ((this._ctx.currentLevel.isPlayerTryAction || this._ctx.currentLevel.downKey) && "open" == this.isDoor) 1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[1] && this._ctx.currentLevel.tutor.closeTip(2),
					"cameraOn" == this.doorName && 1 == this._ctx.currentLevelNumber && this._ctx.currentLevel.tutor.closeTip(4), 2 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[7] && this._ctx.currentLevel.tutor.closeTip(8), 4 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[8] && this._ctx.currentLevel.tutor.closeTip(9), this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody ? this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : (this._ctx.currentLevel.FindStairToTeleport(this.groupID),
						this._ctx.currentLevel.player._compMap.BobHero_33.changeAction(this._stairName, this._x, this._ctx.currentLevel.player._compMap.Sprite_0.y._value)), this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.currentLevel.downKey = !1, 14 == this.groupID && this._ctx.currentLevel.removeCrashWall(), null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose());
				if (this._ctx.currentLevel.isPlayerTryAction && "close" == this.isDoor &&
					("StairDoor2" == this._doorType || "StairDoor3" == this._doorType)) this._ctx.currentLevel.isPlayerTryAction = !1, this._ctx.haveHackerKit && (this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("stay", this._ctx.currentLevel.player._compMap.Sprite_0.x._value, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._ctx.currentLevel.showHackPanel(this.doorName), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon =
					this._currentBalloon, null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose()))
			}
			if (!this._ctx.currentLevel._isHackPanelOnScreen && "close" == this.isDoor && ("StairDoor2" == this._doorType || "StairDoor3" == this._doorType) && Math.abs(this._spriteDoor.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 15 * this._ctx.currentScaleCoef && Math.abs(this._spriteDoor.y._value - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) <
				30 * this._ctx.currentScaleCoef && !this._ctx.kickFirst && !this._ctx.isGameEnd && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy) this.isStairFind = !0, !1 == this._isBalloonShow && !this._ctx.currentLevel.player._compMap.BobHero_33._bobGoToStair && (this._isBalloonShow = !0, b = this._ctx.haveHackerKit ? new g(this._ctx.pack.getTexture("BalloonHackMonitor")) : new g(this._ctx.pack.getTexture("BalloonNone")), this._currentBalloon = (new e).add(b), this._ctx.currentLevel._plashkaLayer.addChild(this._currentBalloon),
				b.setScale(this._ctx.gameScale), b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.haveHackerKit && b.get_pointerDown().connect(function() {
					a._ctx.currentLevel.showHackPanel(a.doorName);
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon = a._currentBalloon;
					null != a._currentBalloon && (a._isBalloonShow = !1, a._ctx.currentLevel._plashkaLayer.removeChild(a._currentBalloon), a._currentBalloon.dispose())
				}));
			!1 == this.isStairFind && null != this._currentBalloon && (1 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevel.tutor.tipsActivate[1] && (this._ctx.currentLevel.tutor.closeTip(2), this._ctx.currentLevel.tutor.tipsActivate[1] = 0), this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair = !1)
		},
		removeBallon: function() {
			null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._plashkaLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair = !1)
		},
		openDoor: function() {
			this.isDoor = "open";
			var a;
			a = this._ctx.pack.getTexture(this._stairName);
			this._spriteDoor = i.instance(this.owner._compMap.Sprite_0, g);
			this.owner.remove(this._spriteDoor);
			this.owner.add(this._spriteDoor = new g(a));
			this._spriteDoor.texture =
				a;
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor()
		},
		__class__: yb
	});
	var zb = function(a, b, c, h) {
		this._movieTimerStop = 1;
		this._movieTimer = 0;
		this._ctx = b;
		this._stairName = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this.isDoor = "close"
	};
	f.StartDoor = zb;
	zb.__name__ = ["StartDoor"];
	zb.__super__ = n;
	zb.prototype = q(n.prototype, {
		get_name: function() {
			return "StartDoor_7"
		},
		onAdded: function() {
			var a = new g(this._ctx.pack.getTexture("gameObjects/elevatorBack"));
			a.setScale(this._ctx.gameScale);
			a.setXY(this._x, this._y);
			a.centerAnchor();
			this._ctx.currentLevel._backLayer.addChild((new e).add(a));
			this._bobElev = new g(this._ctx.pack.getTexture("BobElev"));
			this.owner.addChild((new e).add(this._bobElev));
			this._bobElev.setScale(this._ctx.gameScale);
			this._bobElev.setXY(this._x + 3 * this._ctx.currentScaleCoef, this._y);
			this._bobElev.centerAnchor();
			this._spriteDoor = new g(this._ctx.pack.getTexture("gameObjects/door1"));
			this.owner.addChild((new e).add(this._spriteDoor));
			this._spriteDoor.setScale(this._ctx.gameScale);
			this._spriteDoor.setXY(this._x, this._y);
			this._spriteDoor.centerAnchor()
		},
		onUpdate: function(a) {
			"open" == this.isDoor && (this._movieTimer += a, this._movieTimer >= this._movieTimerStop && (this._movieTimer = 0, this.isDoor = "done", this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("beginLevel", this._x, this._ctx.currentLevel.player._compMap.Sprite_0.y._value), this._bobElev.set_visible(!1), this._ctx.currentLevel.player._compMap.Sprite_0.set_visible(!0)))
		},
		openDoor: function() {
			this.isDoor = "open";
			this._spriteDoor.x.animate(this._x,
				this._x + 60 * this._ctx.currentScaleCoef, 0.5, l.linear);
			this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner;
			this._ctx.pack.getSound("sounds/final_door_open").play(1)
		},
		closeDoor: function() {
			this._spriteDoor.x.animate(this._x + 60 * this._ctx.currentScaleCoef, this._x, 0.5, l.linear);
			this._ctx.pack.getSound("sounds/final_door_close").play(1)
		},
		__class__: zb
	});
	var i = function() {};
	f.Std = i;
	i.__name__ = ["Std"];
	i.is = function(a, b) {
		return I.__instanceof(a, b)
	};
	i.instance = function(a, b) {
		return a instanceof
		b ? a : null
	};
	i.string = function(a) {
		return I.__string_rec(a, "")
	};
	i.int = function(a) {
		return a | 0
	};
	i.parseInt = function(a) {
		var b = parseInt(a, 10);
		if (0 == b && (120 == r.cca(a, 1) || 88 == r.cca(a, 1))) b = parseInt(a);
		return isNaN(b) ? null : b
	};
	i.parseFloat = function(a) {
		return parseFloat(a)
	};
	var ya = function() {
		this.b = ""
	};
	f.StringBuf = ya;
	ya.__name__ = ["StringBuf"];
	ya.prototype = {
		add: function(a) {
			this.b += i.string(a)
		},
		addSub: function(a, b, c) {
			this.b = null == c ? this.b + r.substr(a, b, null) : this.b + r.substr(a, b, c)
		},
		__class__: ya
	};
	var C = function() {};
	f.StringTools = C;
	C.__name__ = ["StringTools"];
	C.startsWith = function(a, b) {
		return a.length >= b.length && r.substr(a, 0, b.length) == b
	};
	C.replace = function(a, b, c) {
		return a.split(b).join(c)
	};
	C.fastCodeAt = function(a, b) {
		return a.charCodeAt(b)
	};
	var t = f.ValueType = {
		__ename__: ["ValueType"],
		__constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
	};
	t.TNull = ["TNull", 0];
	t.TNull.toString = j;
	t.TNull.__enum__ = t;
	t.TInt = ["TInt", 1];
	t.TInt.toString = j;
	t.TInt.__enum__ = t;
	t.TFloat = ["TFloat", 2];
	t.TFloat.toString =
		j;
	t.TFloat.__enum__ = t;
	t.TBool = ["TBool", 3];
	t.TBool.toString = j;
	t.TBool.__enum__ = t;
	t.TObject = ["TObject", 4];
	t.TObject.toString = j;
	t.TObject.__enum__ = t;
	t.TFunction = ["TFunction", 5];
	t.TFunction.toString = j;
	t.TFunction.__enum__ = t;
	t.TClass = function(a) {
		a = ["TClass", 6, a];
		a.__enum__ = t;
		a.toString = j;
		return a
	};
	t.TEnum = function(a) {
		a = ["TEnum", 7, a];
		a.__enum__ = t;
		a.toString = j;
		return a
	};
	t.TUnknown = ["TUnknown", 8];
	t.TUnknown.toString = j;
	t.TUnknown.__enum__ = t;
	var B = function() {};
	f.Type = B;
	B.__name__ = ["Type"];
	B.getClass = function(a) {
		return null ==
			a ? null : a instanceof Array && null == a.__enum__ ? Array : a.__class__
	};
	B.getClassName = function(a) {
		return a.__name__.join(".")
	};
	B.getEnumName = function(a) {
		return a.__ename__.join(".")
	};
	B.resolveClass = function(a) {
		a = f[a];
		return null == a || !a.__name__ ? null : a
	};
	B.resolveEnum = function(a) {
		a = f[a];
		return null == a || !a.__ename__ ? null : a
	};
	B.createEmptyInstance = function(a) {
		function b() {}
		b.prototype = a.prototype;
		return new b
	};
	B.createEnum = function(a, b, c) {
		var h = N.field(a, b);
		if (null == h) throw "No such constructor " + b;
		if (N.isFunction(h)) {
			if (null ==
				c) throw "Constructor " + b + " need parameters";
			return h.apply(a, c)
		}
		if (null != c && 0 != c.length) throw "Constructor " + b + " does not need parameters";
		return h
	};
	B.getEnumConstructs = function(a) {
		return a.__constructs__.slice()
	};
	B["typeof"] = function(a) {
		switch (typeof a) {
			case "boolean":
				return t.TBool;
			case "string":
				return t.TClass(String);
			case "number":
				return Math.ceil(a) == a % 2147483648 ? t.TInt : t.TFloat;
			case "object":
				if (null == a) return t.TNull;
				var b = a.__enum__;
				if (null != b) return t.TEnum(b);
				a = a instanceof Array && null == a.__enum__ ?
					Array : a.__class__;
				return null != a ? t.TClass(a) : t.TObject;
			case "function":
				return a.__name__ || a.__ename__ ? t.TObject : t.TFunction;
			case "undefined":
				return t.TNull;
			default:
				return t.TUnknown
		}
	};
	var rc = function(a, b) {
		null == b && (b = 0);
		null == a && (a = 0);
		this.x = a;
		this.y = b
	};
	f.Vec2 = rc;
	rc.__name__ = ["Vec2"];
	rc.prototype = {
		__class__: rc
	};
	var ha = function(a, b) {
		null == b && (b = 0);
		null == a && (a = 0);
		this.x = a;
		this.y = b
	};
	f.Vector2 = ha;
	ha.__name__ = ["Vector2"];
	ha.prototype = {
		__class__: ha
	};
	var Sa = function(a, b) {
		this.px = a;
		this.py = b
	};
	f.Wall = Sa;
	Sa.__name__ = ["Wall"];
	Sa.prototype = {
		__class__: Sa
	};
	f.XmlType = {
		__ename__: ["XmlType"],
		__constructs__: []
	};
	var p = function() {};
	f.Xml = p;
	p.__name__ = ["Xml"];
	p.parse = function(a) {
		return ia.parse(a)
	};
	p.createElement = function(a) {
		var b = new p;
		b.nodeType = p.Element;
		b._children = [];
		b._attributes = new E;
		b.set_nodeName(a);
		return b
	};
	p.createPCData = function(a) {
		var b = new p;
		b.nodeType = p.PCData;
		b.set_nodeValue(a);
		return b
	};
	p.createCData = function(a) {
		var b = new p;
		b.nodeType = p.CData;
		b.set_nodeValue(a);
		return b
	};
	p.createComment = function(a) {
		var b =
			new p;
		b.nodeType = p.Comment;
		b.set_nodeValue(a);
		return b
	};
	p.createDocType = function(a) {
		var b = new p;
		b.nodeType = p.DocType;
		b.set_nodeValue(a);
		return b
	};
	p.createProcessingInstruction = function(a) {
		var b = new p;
		b.nodeType = p.ProcessingInstruction;
		b.set_nodeValue(a);
		return b
	};
	p.createDocument = function() {
		var a = new p;
		a.nodeType = p.Document;
		a._children = [];
		return a
	};
	p.prototype = {
		get_nodeName: function() {
			if (this.nodeType != p.Element) throw "bad nodeType";
			return this._nodeName
		},
		set_nodeName: function(a) {
			if (this.nodeType !=
				p.Element) throw "bad nodeType";
			return this._nodeName = a
		},
		set_nodeValue: function(a) {
			if (this.nodeType == p.Element || this.nodeType == p.Document) throw "bad nodeType";
			return this._nodeValue = a
		},
		get: function(a) {
			if (this.nodeType != p.Element) throw "bad nodeType";
			return this._attributes.get(a)
		},
		set: function(a, b) {
			if (this.nodeType != p.Element) throw "bad nodeType";
			this._attributes.set(a, b)
		},
		exists: function(a) {
			if (this.nodeType != p.Element) throw "bad nodeType";
			return this._attributes.exists(a)
		},
		elementsNamed: function(a) {
			if (null ==
				this._children) throw "bad nodetype";
			return {
				cur: 0,
				x: this._children,
				hasNext: function() {
					for (var b = this.cur, c = this.x.length; b < c;) {
						var h = this.x[b];
						if (h.nodeType == p.Element && h._nodeName == a) break;
						b++
					}
					this.cur = b;
					return b < c
				},
				next: function() {
					for (var b = this.cur, c = this.x.length; b < c;) {
						var h = this.x[b];
						b++;
						if (h.nodeType == p.Element && h._nodeName == a) return this.cur = b, h
					}
					return null
				}
			}
		},
		firstElement: function() {
			if (null == this._children) throw "bad nodetype";
			for (var a = 0, b = this._children.length; a < b;) {
				var c = this._children[a];
				if (c.nodeType == p.Element) return c;
				a++
			}
			return null
		},
		addChild: function(a) {
			if (null == this._children) throw "bad nodetype";
			null != a._parent && r.remove(a._parent._children, a);
			a._parent = this;
			this._children.push(a)
		},
		__class__: p
	};
	var wb = function(a, b, c, h, d, s, e) {
		this._seeEnemyLeft = this._seeEnemyRight = !1;
		this._isChilled = !0;
		this._idleTimer = this._movieTimer = this._kickTimer = this._timerToChill = 0;
		this._isKickoff = this._isBalloonShow = this.isStairFind = this._enemyIdle = !1;
		this._timerSwitch = this._timerWarning = this._timerKickoff =
			0;
		this._isBobInFocus = this._inShadow = !1;
		this._enemyState = "free";
		this._direction = "right";
		this.ENEMY_SPEED = 1;
		this._ctx = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this._viewL = this._x - d * this._ctx.gameScale;
		this._viewR = this._x + s * this._ctx.gameScale;
		this._delay = 3;
		this.enemyType = b;
		this.destroyed = new T;
		this.ENEMY_SPEED *= this._ctx.gameScale;
		this.enemyId = e;
		this.isBoxCovered = !1
	};
	f["enemies.GuardA"] = wb;
	wb.__name__ = ["enemies", "GuardA"];
	wb.__super__ = n;
	wb.prototype = q(n.prototype, {
		get_name: function() {
			return "GuardA_28"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "guardAAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite = new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.movePointX = this._x;
			this.movePointY = this._y;
			this.changeAction("move");
			this._sign = new ea(this._ctx, this._x, this._y - 34 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel._screensLayer.addChild((new e).add(this._sign));
			if (!this._ctx.goNextPart) {
				1 ==
					this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this.enemyId == this.objectsForSave[a].eId) {
						this._isKickoff = !0;
						this.changeAction("savedead", this.objectsForSave[a].ePosX, this._y);
						this.objectsForSave[a].uBox ? (this.isBoxCovered = !0, this.CoverTheBox()) : this.checkShadows();
						break
					}++a
				}
			}
		},
		onUpdate: function(a) {
			this._x = this.owner._compMap.Sprite_0.x._value;
			this._y = this.owner._compMap.Sprite_0.y._value;
			this._sign.setCoor(this._x, this._y - 34 * this._ctx.currentScaleCoef);
			if (("dead" == this.currentAction || "savedead" == this.currentAction) && !this._inShadow && !this.isBoxCovered)
				for (var b = 0, c = this._ctx.currentLevel._cameras.length; b < c;) Math.abs(this._y - this._ctx.currentLevel._cameras[b].getYPos()) < 30 * this._ctx.currentScaleCoef && (this._ctx.currentLevel._cameras[b].checkEnemyLeftSide(this._x),
					this._ctx.currentLevel._cameras[b].checkEnemyRightSide(this._x)), ++b;
			b = 0;
			for (c = this._ctx.levelGuards.length; b < c;) !1 == this._ctx.levelGuards[b].isCovered && (this.checkEnemyLeftSide(this._ctx.levelGuards[b].x, this._ctx.levelGuards[b].y), this.checkEnemyRightSide(this._ctx.levelGuards[b].x, this._ctx.levelGuards[b].y)), ++b;
			this.isBoxCovered || this.checkForBaloon();
			this._isKickoff && ("kicked" == this.currentAction && (this._kickTimer += a, this._kickTimer > this._kickTimerStop && this.changeAction("kickOff")), "dead" !=
				this.currentAction && (this._timerKickoff += a), 0.7 < this._timerKickoff && "kickOff" == this.currentAction && this.changeAction("dead"));
			if (("stay" == this.currentAction || "idle2" == this.currentAction) && !this._isKickoff) this._timerSwitch += a, 1.5 < this._timerSwitch && "stay" == this.currentAction && this.changeAction("idle2"), this._timerSwitch > this._delay && (this._timerSwitch = 0, this.changeAction("move"));
			"move" == this.currentAction && !this._isKickoff && ("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewR) >
				this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value + this.ENEMY_SPEED)) : (this._direction = "left", this.IdleEnemy())), "left" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewL) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value - this.ENEMY_SPEED)) : (this._direction = "right", this.IdleEnemy())));
			"warning" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._movieTimerStop = 0.4, this._isBobInFocus ? this.changeAction("startTalk") : this.IdleEnemy()));
			"warningIdle" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._isBobInFocus ? this.changeAction("shot") : (this._movieTimerStop = 0.4, this.changeAction("startTalk"))));
			"shot" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._isBobInFocus && (this._movieTimerStop = 0.4, this.changeAction("warningEnd"))));
			"warningEnd" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop &&
				(this._movieTimer = 0, "alertTimer" == this._ctx.currentLevel.globalState ? (this._movieTimerStop = 0.4, this.changeAction("startTalk")) : this.IdleEnemy()));
			"startTalk" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.changeAction("talk")));
			"endTalk" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.IdleEnemy()));
			"attentionIdle" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop &&
				(this._movieTimer = 0, this.IdleEnemy()));
			"silence" == this._ctx.currentLevel.globalState && "alert" == this._enemyState && this.resetEnemy();
			this._isChilled || (this._timerToChill += a, 2 < this._timerToChill && (this._timerToChill = 0, this._isChilled = !0, this._sign.stopAction()));
			(this.checkForBob() || this._seeEnemyLeft || this._seeEnemyRight) && !this._isKickoff ? (this._isBobInFocus = !0, this._ctx.currentLevel.talert.set__(5), "free" == this._enemyState && (this._enemyState = "warning", this._sign.changeAction("_SignB"), this.changeAction("attention"),
				this._timerWarning += this._timerToChill, this._isChilled = !1), "warning" == this._enemyState && (this._timerWarning += a, 1 < this._timerWarning && (this._enemyState = "alert", this._ctx.currentLevel.globalState = "alert", this._sign.changeAction("_SignA"), this._ctx.isGameEnd || this._ctx.currentLevel.gameOver(), this._movieTimerStop = 0.4, this.changeAction("warning"), this._ctx.pack.getSound("sounds/soldier_radio").play()))) : (this._timerWarning = 0, this._isBobInFocus && (this._isBobInFocus = !1, "warning" == this._enemyState && (this._movieTimerStop =
				0.9, this.currentAction = "attentionIdle", this._enemyState = "free", this._moviePlayer.loop("_AttentionIdle", !1)), "alert" == this._enemyState && (this._ctx.currentLevel.globalState = "alertTimer", this.changeAction("warningEnd"))))
		},
		checkForBaloon: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
				70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, "GuardA" == this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover && (this.isBoxCovered = !0, this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody && this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox"),
				this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "GuardA", this.isStairFind = !1, null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose()))));
			Math.abs(this.enemySprite.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 20 * this._ctx.currentScaleCoef && Math.abs(this.enemySprite.y._value - this._ctx.currentLevel.player._compMap.Sprite_0.y._value) <
				40 * this._ctx.currentScaleCoef && !this._isKickoff && "alert" != this._enemyState && ("stay" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction || "move" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction) && this.kickEnemy();
			this.isStairFind = !1;
			if (Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 24 * this._ctx.currentScaleCoef && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && this._isKickoff && this._ctx.haveBox &&
				!this._ctx.isGameEnd && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonBox"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._bulkheadLayer.addChild(this._currentBalloon);
				this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !0;
				this._ctx.currentLevel.player._compMap.BobHero_33._currentEnemy = this.owner;
				this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover =
					"GuardA";
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a.isBoxCovered = !0;
					a._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody && a._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox");
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "GuardA";
					a.isStairFind = !1;
					null != a._currentBalloon && (a._isBalloonShow = !1, a._ctx.currentLevel._bulkheadLayer.removeChild(a._currentBalloon), a._currentBalloon.dispose())
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !1)
		},
		kickEnemy: function() {
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("hit");
			1 == this._ctx.currentLevelNumber && this._ctx.currentLevel.tutor.closeTip(7);
			this._isKickoff = !0;
			this._enemyState = "free";
			this._ctx.kickFirst = !1;
			this.currentAction = "kicked";
			this._timerWarning = this._timerSwitch = 0;
			this._kickTimerStop = 0.2;
			this._ctx.addObjectsToSave(new Q(this.enemyId, this._x, this.isBoxCovered));
			this.checkShadows()
		},
		CoverTheBox: function() {
			this.isBoxCovered = !0;
			if (1 == this._ctx.currentLevelPart)
				for (var a =
						0, b = this._ctx.tempObjectsForSave.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave[a].eId) {
						this._ctx.tempObjectsForSave[a].uBox = !0;
						break
					}++a
				}
			if (2 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave2.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave2[a].eId) {
						this._ctx.tempObjectsForSave2[a].uBox = !0;
						break
					}++a
				}
			}
			if (3 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave3.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave3[a].eId) {
						this._ctx.tempObjectsForSave3[a].uBox = !0;
						break
					}++a
				}
			}
			this.owner.remove(this._moviePlayer);
			this._moviePlayer.dispose();
			this._sign.stopAction();
			this.owner.add(a = new g(this._ctx.pack.getTexture("gameObjects/box")));
			a.setScale(this._ctx.gameScale);
			a.centerAnchor();
			a.setXY(this.enemySprite.x._value, this.enemySprite.y._value + 2 * this._ctx.currentScaleCoef);
			a = 0;
			for (b = this._ctx.levelGuards.length; a < b;) this._ctx.levelGuards[a].guardId == this.enemyId && (this._ctx.levelGuards[a].isCovered = !0), ++a
		},
		checkShadows: function() {
			for (var a = 0, b = this._ctx.currentLevel._shadows.length; a <
				b;) {
				if (Math.abs(this._y - this._ctx.currentLevel._shadows[a].getYPos()) < 30 * this._ctx.currentScaleCoef && this._ctx.currentLevel._shadows[a].checkEnemyInShadow(this._x)) {
					this._inShadow = !0;
					this._ctx.currentLevel._enemiesLayer.removeChild(this.owner);
					this._ctx.currentLevel._objectsLayer.addChild(this.owner);
					break
				}++a
			}!1 == this._inShadow && this._ctx.levelGuards.push(new Oa(this._x, this._y, this.enemyId))
		},
		resetEnemy: function() {
			this._isKickoff || (this._enemyState = "free", this.IdleEnemy(), this._timerWarning = this._timerSwitch =
				0)
		},
		changeAction: function(a, b) {
			null == b && (b = 0);
			this.currentAction = a;
			"move" == this.currentAction && (this._moviePlayer.loop("_Walk", !1), "left" == this._direction && this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), "right" == this._direction && this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)));
			"kickOff" == this.currentAction && (this._moviePlayer.loop("_Kicked", !0), this._ctx.pack.getSound("sounds/body_fall").play());
			"dead" == this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value +
				8 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this._moviePlayer.loop("_Dead", !0));
			"savedead" == this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value + 8 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this.enemySprite.setXY(b, this.enemySprite.y._value), this._moviePlayer.loop("_Dead", !0));
			"attention" == this.currentAction && this._moviePlayer.loop("_Attention", !1);
			"warning" == this.currentAction && this._moviePlayer.loop("_Warning", !1);
			"warningIdle" == this.currentAction &&
				this._moviePlayer.loop("_IdleWarning", !1);
			"idle2" == this.currentAction && this._moviePlayer.loop("_Idle2", !1);
			"shot" == this.currentAction && (this._movieTimerStop = 0.5, this._moviePlayer.loop("_Shot", !1));
			"warningEnd" == this.currentAction && (this._movieTimerStop = 0.5, this._moviePlayer.loop("_WarningEnd", !1));
			"startTalk" == this.currentAction && (this._movieTimerStop = 0.4, this._moviePlayer.loop("_StartTalk", !1));
			"talk" == this.currentAction && this._moviePlayer.loop("_Talk", !1)
		},
		checkEnemyLeftSide: function(a, b) {
			a - 20 *
				this._ctx.gameScale < this._x && a > this._viewL && "left" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ? (this._seeEnemyLeft = !0, this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyLeft = !1
		},
		checkEnemyRightSide: function(a, b) {
			a + 20 * this._ctx.gameScale > this._x && a < this._viewR && "right" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ? (this._seeEnemyRight = !0, this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyRight = !1
		},
		checkForBob: function() {
			if (this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow || this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy) return !1;
			if ("stay" != this.currentAction && "left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 *
				Math.abs(this.enemySprite.scaleX._value)), !0;
			if ("stay" != this.currentAction && "right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), !0;
			if ("attentionIdle" == this.currentAction) {
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), this._direction = "left", this.IdleEnemy(), !0;
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), this._direction = "right", this.IdleEnemy(), !0
			}
			return !1
		},
		IdleEnemy: function() {
			this._enemyIdle = !0;
			this._idleTimer = 0;
			this.currentAction = "stay";
			this._moviePlayer.loop("_Idle", !1);
			this._ctx.pack.getSound("sounds/soldier_idle").play()
		},
		__class__: wb
	});
	var xa = function(a, b, c, h, d, s, e) {
		this._seeEnemyLeft =
			this._seeEnemyRight = !1;
		this._isChilled = !0;
		this._idleTimer = this._movieTimer = this._kickTimer = this._timerToChill = 0;
		this._isKickoff = this._isBalloonShow = this.isStairFind = this._enemyIdle = !1;
		this._timerSwitch = this._timerWarning = this._timerKickoff = 0;
		this._isBobInFocus = this._inShadow = !1;
		this._enemyState = "free";
		this._direction = "right";
		this.ENEMY_SPEED = 0.8;
		this._ctx = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this._viewL = this._x - d * this._ctx.gameScale;
		this._distanceR = this._viewR = this._x + s * this._ctx.gameScale;
		10 == a.currentLevelNumber && 2 == a.currentLevelPart && (this._viewR = this._x + (s + 150) * this._ctx.gameScale);
		this._delay = 3;
		this.enemyType = b;
		this.destroyed = new T;
		this.ENEMY_SPEED *= this._ctx.gameScale;
		this.enemyId = e;
		this.isBoxCovered = !1
	};
	f["enemies.GuardB"] = xa;
	xa.__name__ = ["enemies", "GuardB"];
	xa.__super__ = n;
	xa.prototype = q(n.prototype, {
		get_name: function() {
			return "GuardB_27"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "guardBAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite =
				new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.movePointX = this._x;
			this.movePointY = this._y;
			this.changeAction("move");
			this._sign = new ea(this._ctx, this._x, this._y - 34 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel._screensLayer.addChild((new e).add(this._sign));
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave =
					this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this.enemyId == this.objectsForSave[a].eId) {
						this._isKickoff = !0;
						this.changeAction("savedead", this.objectsForSave[a].ePosX, this._y);
						this.objectsForSave[a].uBox ? (this.isBoxCovered = !0, this.CoverTheBox()) : this.checkShadows();
						break
					}++a
				}
			}
		},
		onUpdate: function(a) {
			this._x = this.owner._compMap.Sprite_0.x._value;
			this._y = this.owner._compMap.Sprite_0.y._value;
			this._sign.setCoor(this._x,
				this._y - 34 * this._ctx.currentScaleCoef);
			if (("dead" == this.currentAction || "savedead" == this.currentAction) && !this._inShadow && !this.isBoxCovered)
				for (var b = 0, c = this._ctx.currentLevel._cameras.length; b < c;) Math.abs(this._y - this._ctx.currentLevel._cameras[b].getYPos()) < 30 * this._ctx.currentScaleCoef && (this._ctx.currentLevel._cameras[b].checkEnemyLeftSide(this._x), this._ctx.currentLevel._cameras[b].checkEnemyRightSide(this._x)), ++b;
			b = 0;
			for (c = this._ctx.levelGuards.length; b < c;) !1 == this._ctx.levelGuards[b].isCovered &&
				(this.checkEnemyLeftSide(this._ctx.levelGuards[b].x, this._ctx.levelGuards[b].y), this.checkEnemyRightSide(this._ctx.levelGuards[b].x, this._ctx.levelGuards[b].y)), ++b;
			this.isBoxCovered || this.checkForBaloon();
			this._isKickoff && ("kicked" == this.currentAction && (this._kickTimer += a, this._kickTimer > this._kickTimerStop && this.changeAction("kickOff")), "dead" != this.currentAction && (this._timerKickoff += a), 0.7 < this._timerKickoff && "kickOff" == this.currentAction && this.changeAction("dead"));
			if (("stay" == this.currentAction ||
					"idle2" == this.currentAction) && !this._isKickoff) this._timerSwitch += a, 1.5 < this._timerSwitch && "stay" == this.currentAction && this.changeAction("idle2"), this._timerSwitch > this._delay && (this._timerSwitch = 0, this.changeAction("move"));
			"move" == this.currentAction && !this._isKickoff && ("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._distanceR) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value + this.ENEMY_SPEED)) : (this._direction = "left", this.IdleEnemy())), "left" == this._direction && (Math.abs(this.enemySprite.x._value -
				this._viewL) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value - this.ENEMY_SPEED)) : (this._direction = "right", this.IdleEnemy())));
			"warning" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._movieTimerStop = 0.4, this._isBobInFocus ? this.changeAction("startTalk") : this.IdleEnemy()));
			"warningIdle" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._isBobInFocus ? this.changeAction("shot") : (this._movieTimerStop =
				0.4, this.changeAction("startTalk"))));
			"shot" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._isBobInFocus && (this._movieTimerStop = 0.4, this.changeAction("warningEnd"))));
			"warningEnd" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, "alertTimer" == this._ctx.currentLevel.globalState ? (this._movieTimerStop = 0.4, this.changeAction("startTalk")) : this.IdleEnemy()));
			"startTalk" == this.currentAction && (this._movieTimer +=
				a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.changeAction("talk")));
			"endTalk" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.IdleEnemy()));
			"attentionIdle" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.IdleEnemy()));
			"silence" == this._ctx.currentLevel.globalState && "alert" == this._enemyState && this.resetEnemy();
			this._isChilled || (this._timerToChill += a, 2 < this._timerToChill &&
				(this._timerToChill = 0, this._isChilled = !0, this._sign.stopAction()));
			(this.checkForBob() || this._seeEnemyLeft || this._seeEnemyRight) && !this._isKickoff ? (this._isBobInFocus = !0, this._ctx.currentLevel.talert.set__(5), "free" == this._enemyState && (this._enemyState = "warning", this._sign.changeAction("_SignB"), this.changeAction("attention"), this._timerWarning += this._timerToChill, this._isChilled = !1), "warning" == this._enemyState && (this._timerWarning += a, 1.3 < this._timerWarning && (this._enemyState = "alert", this._ctx.currentLevel.globalState =
				"alert", this._sign.changeAction("_SignA"), this._ctx.isGameEnd || this._ctx.currentLevel.gameOver(), this._movieTimerStop = 0.4, this.changeAction("warning"), this._ctx.pack.getSound("sounds/soldier_radio").play()))) : (this._timerWarning = 0, this._isBobInFocus && (this._isBobInFocus = !1, "warning" == this._enemyState && (this._movieTimerStop = 0.9, this.currentAction = "attentionIdle", this._enemyState = "free", this._moviePlayer.loop("_AttentionIdle", !1)), "alert" == this._enemyState && (this._ctx.currentLevel.globalState = "alertTimer",
				this.changeAction("warningEnd"))))
		},
		checkForBaloon: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, "GuardB" == this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover &&
				(this.isBoxCovered = !0, this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody && this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox"), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "GuardB", this.isStairFind = !1, null != this._currentBalloon &&
					(this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose()))));
			Math.abs(this.enemySprite.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 20 * this._ctx.currentScaleCoef && Math.abs(this.enemySprite.y._value - this._ctx.currentLevel.player._compMap.Sprite_0.y._value) < 40 * this._ctx.currentScaleCoef && !this._isKickoff && "alert" != this._enemyState && this._ctx.haveShocker && ("stay" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction ||
				"move" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction) && this.kickEnemy();
			this.isStairFind = !1;
			if (Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 24 * this._ctx.currentScaleCoef && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && this._isKickoff && this._ctx.haveBox && !this._ctx.isGameEnd && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonBox"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._bulkheadLayer.addChild(this._currentBalloon);
				this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !0;
				this._ctx.currentLevel.player._compMap.BobHero_33._currentEnemy = this.owner;
				this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "GuardB";
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef,
					this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a.isBoxCovered = !0;
					a._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody && a._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox");
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover =
						"GuardB";
					a.isStairFind = !1;
					null != a._currentBalloon && (a._isBalloonShow = !1, a._ctx.currentLevel._bulkheadLayer.removeChild(a._currentBalloon), a._currentBalloon.dispose())
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !1)
		},
		kickEnemy: function() {
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("shock");
			this._enemyState = "free";
			this._ctx.kickFirst = !1;
			this._isKickoff = !0;
			this.currentAction = "kicked";
			this._timerWarning = this._timerSwitch = 0;
			this._kickTimerStop = 0.2;
			this._ctx.addObjectsToSave(new Q(this.enemyId, this._x, this.isBoxCovered));
			this.checkShadows()
		},
		resetEnemy: function() {
			this._isKickoff || (this._enemyState = "free", this.IdleEnemy(), this._timerWarning = this._timerSwitch = 0)
		},
		changeAction: function(a, b) {
			null == b && (b = 0);
			this.currentAction = a;
			"move" == this.currentAction && (this._moviePlayer.loop("_Walk", !1),
				"left" == this._direction && this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), "right" == this._direction && this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)));
			"kickOff" == this.currentAction && (this._moviePlayer.loop("_Kicked", !0), this._ctx.pack.getSound("sounds/body_fall").play());
			"dead" == this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value + 8 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this._moviePlayer.loop("_Dead", !0));
			"savedead" ==
			this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value + 8 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this.enemySprite.setXY(b, this.enemySprite.y._value), this._moviePlayer.loop("_Dead", !0));
			"attention" == this.currentAction && this._moviePlayer.loop("_Attention", !1);
			"warning" == this.currentAction && this._moviePlayer.loop("_Attention", !1);
			"warningIdle" == this.currentAction && this._moviePlayer.loop("_Attention", !1);
			"idle2" == this.currentAction && this._moviePlayer.loop("_Idle2",
				!1);
			"shot" == this.currentAction && (this._movieTimerStop = 0.5, this._moviePlayer.loop("_Shot", !1));
			"warningEnd" == this.currentAction && (this._movieTimerStop = 0.5, this._moviePlayer.loop("_AttentionIdle", !1));
			"startTalk" == this.currentAction && (this._movieTimerStop = 0.4, this._moviePlayer.loop("_StartTalk", !1));
			"talk" == this.currentAction && this._moviePlayer.loop("_Talk", !1)
		},
		checkEnemyLeftSide: function(a, b) {
			a - 20 * this._ctx.gameScale < this._x && a > this._viewL && "left" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ?
				(this._seeEnemyLeft = !0, this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyLeft = !1
		},
		checkEnemyRightSide: function(a, b) {
			a + 20 * this._ctx.gameScale > this._x && a < this._viewR && "right" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ? (this._seeEnemyRight = !0, this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyRight = !1
		},
		checkForBob: function() {
			if (this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow || this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy) return !1;
			if (Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - this._x) < 40 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef && !this._ctx.isGameEnd && !this._isKickoff && ("left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._x || "right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._x)) this._enemyState = "alert", this._ctx.currentLevel.globalState = "alert",
				this._sign.changeAction("_SignA"), this._ctx.isGameEnd || this._ctx.currentLevel.gameOver(), this._movieTimerStop = 0.4, this.changeAction("warning");
			if ("left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)),
				!0;
			if ("right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), !0;
			if ("attentionIdle" == this.currentAction) {
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), this._direction = "left", this.IdleEnemy(), !0;
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), this._direction = "right", this.IdleEnemy(), !0
			}
			return !1
		},
		CoverTheBox: function() {
			this.isBoxCovered = !0;
			if (1 == this._ctx.currentLevelPart)
				for (var a = 0, b = this._ctx.tempObjectsForSave.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave[a].eId) {
						this._ctx.tempObjectsForSave[a].uBox = !0;
						break
					}++a
				}
			if (2 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave2.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave2[a].eId) {
						this._ctx.tempObjectsForSave2[a].uBox = !0;
						break
					}++a
				}
			}
			if (3 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave3.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave3[a].eId) {
						this._ctx.tempObjectsForSave3[a].uBox = !0;
						break
					}++a
				}
			}
			this.owner.remove(this._moviePlayer);
			this._moviePlayer.dispose();
			this._sign.stopAction();
			this.owner.add(a =
				new g(this._ctx.pack.getTexture("gameObjects/box")));
			a.setScale(this._ctx.gameScale);
			a.centerAnchor();
			a.setXY(this.enemySprite.x._value, this.enemySprite.y._value + 2 * this._ctx.currentScaleCoef);
			a = 0;
			for (b = this._ctx.levelGuards.length; a < b;) this._ctx.levelGuards[a].guardId == this.enemyId && (this._ctx.levelGuards[a].isCovered = !0), ++a
		},
		checkShadows: function() {
			for (var a = 0, b = this._ctx.currentLevel._shadows.length; a < b;) {
				if (Math.abs(this._y - this._ctx.currentLevel._shadows[a].getYPos()) < 30 * this._ctx.currentScaleCoef &&
					this._ctx.currentLevel._shadows[a].checkEnemyInShadow(this._x)) {
					this._inShadow = !0;
					this._ctx.currentLevel._enemiesLayer.removeChild(this.owner);
					this._ctx.currentLevel._objectsLayer.addChild(this.owner);
					break
				}++a
			}!1 == this._inShadow && this._ctx.levelGuards.push(new Oa(this._x, this._y, this.enemyId))
		},
		IdleEnemy: function() {
			this._enemyIdle = !0;
			this._idleTimer = 0;
			this.currentAction = "stay";
			this._moviePlayer.loop("_Idle", !1);
			this._ctx.pack.getSound("sounds/soldier_idle").play()
		},
		__class__: xa
	});
	var Qa = function(a,
		b, c, h, d, s, e, g) {
		null == g && (g = "right");
		this._isChilled = !0;
		this._idleTimer = this._timerToChill = 0;
		this._isKickoff = this._enemyIdle = !1;
		this._timerSwitch = this._timerWarning = this._timerKickoff = this._movieTimer = 0;
		this._isBobInFocus = this._inShadow = !1;
		this._enemyState = "free";
		this._direction = "right";
		this.ENEMY_SPEED = 0.6;
		this._ctx = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this._viewL = this._x - d * this._ctx.gameScale;
		this._viewR = this._x + s * this._ctx.gameScale;
		this._delay = 3;
		this.enemyType = b;
		this.enemyId =
			e;
		this.destroyed = new T;
		this._direction = g;
		this.ENEMY_SPEED *= this._ctx.gameScale;
		this._steps = this._ctx.pack.getSound("sounds/mummy_footsteps");
		this._runSteps = this._ctx.pack.getSound("sounds/mummy_run");
		this.isBoxCovered = this.mummyRuning = this.mummyWalking = !1
	};
	f["enemies.Mummy"] = Qa;
	Qa.__name__ = ["enemies", "Mummy"];
	Qa.__super__ = n;
	Qa.prototype = q(n.prototype, {
		get_name: function() {
			return "Mummy_29"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "mummyAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite = new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.movePointX = this._x;
			this.movePointY = this._y;
			this.changeAction("move");
			this._sign = new ea(this._ctx, this._x, this._y - 34 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel._screensLayer.addChild((new e).add(this._sign));
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave =
					this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this.enemyId == this.objectsForSave[a].eId) {
						this._isKickoff = !0;
						this.changeAction("savedead", this.objectsForSave[a].ePosX, this._y);
						this.objectsForSave[a].uBox ? (this.isBoxCovered = !0, this.CoverTheBox()) : this.checkShadows();
						break
					}++a
				}
			}
		},
		onUpdate: function(a) {
			this._x = this.owner._compMap.Sprite_0.x._value;
			this._y = this.owner._compMap.Sprite_0.y._value;
			this._sign.setCoor(this._x,
				this._y - 34 * this._ctx.currentScaleCoef);
			if (("dead" == this.currentAction || "savedead" == this.currentAction) && !this._inShadow)
				for (var b = 0, c = this._ctx.currentLevel._cameras.length; b < c;) Math.abs(this._y - this._ctx.currentLevel._cameras[b].getYPos()) < 30 * this._ctx.currentScaleCoef && (this._ctx.currentLevel._cameras[b].checkEnemyLeftSide(this._x), this._ctx.currentLevel._cameras[b].checkEnemyRightSide(this._x)), ++b;
			this.isBoxCovered || this.checkForBaloon();
			this._isKickoff && (this._timerKickoff += a, 0.3 < this._timerKickoff &&
				"kick" == this.currentAction && (this.changeAction("kicked"), this._ctx.pack.getSound("sounds/body_fall").play()), 0.7 < this._timerKickoff && "kicked" == this.currentAction && this.changeAction("dead"), 1.4 < this._timerKickoff && "dead" == this.currentAction && this.changeAction("comeBack"), 1.8 < this._timerKickoff && (this._timerKickoff = 0, this.enemySprite.setXY(this.enemySprite.x._value, this.enemySprite.y._value - 4 * this._ctx.currentScaleCoef), this._isKickoff = !1, this.IdleEnemy()));
			"stay" == this.currentAction && !this._isKickoff &&
				(this._timerSwitch += a, this._timerSwitch > this._delay && (this._timerSwitch = 0, this.changeAction("move")));
			"move" == this.currentAction && !this._isKickoff && ("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewR) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value + this.ENEMY_SPEED)) : (this._direction = "left", this.IdleEnemy())), "left" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewL) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value - this.ENEMY_SPEED)) : (this._direction =
				"right", this.IdleEnemy())));
			"hit" == this.currentAction && !this._isKickoff && (this._movieTimer += a, "right" == this._direction && (b = this.enemySprite.x, b.set__(b._value + this.ENEMY_SPEED)), "left" == this._direction && (b = this.enemySprite.x, b.set__(b._value - this.ENEMY_SPEED)), this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._enemyState = "free", this.IdleEnemy()));
			"run" == this.currentAction && !this._isKickoff && ("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) >
				this.ENEMY_SPEED + 30 * this._ctx.currentScaleCoef ? (b = this.enemySprite.x, b.set__(b._value + (this.ENEMY_SPEED + 1))) : this.changeAction("hit")), "left" == this._direction && (Math.abs(this.enemySprite.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) > this.ENEMY_SPEED + 30 * this._ctx.currentScaleCoef ? (b = this.enemySprite.x, b.set__(b._value - (this.ENEMY_SPEED + 1))) : this.changeAction("hit")));
			"gone" == this.currentAction && !this._isKickoff && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer =
				0, this._enemyState = "free", this.IdleEnemy()));
			this._isChilled || (this._timerToChill += a, 2 < this._timerToChill && (this._timerToChill = 0, this._isChilled = !0, this._sign.stopAction()));
			if (this.checkForBob() && !this._isKickoff) "free" == this._enemyState && (this._enemyState = "warning", this._sign.changeAction("_SignB"), this.changeAction("scream"), this._ctx.pack.getSound("sounds/mummy_angry").play(), this._timerWarning += this._timerToChill, this._isChilled = !1), "warning" == this._enemyState && (this._timerWarning += a, 0.6 < this._timerWarning &&
				(this._enemyState = "alert", this._timerWarning = 0, this._enemyState = "pursuit", this._sign.changeAction("_SignA"), this.changeAction("run"))), this._isBobInFocus = !0;
			else {
				this._timerWarning = 0;
				if (("warning" == this._enemyState || "alert" == this._enemyState || "pursuit" == this._enemyState) && "gone" != this.currentAction) this.currentAction = "gone", this._movieTimer = 0, this._movieTimerStop = 1.2, this._moviePlayer.loop("_JumpAttack", !1), this._ctx.pack.getSound("sounds/mummy_attack").play();
				this._isBobInFocus = !1
			}
		},
		checkForBaloon: function() {
			Math.abs(this.enemySprite.x._value -
				this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 20 * this._ctx.currentScaleCoef && Math.abs(this.enemySprite.y._value - this._ctx.currentLevel.player._compMap.Sprite_0.y._value) < 40 * this._ctx.currentScaleCoef && !this._isKickoff && "alert" != this._enemyState && !this._ctx.isGameEnd && ("stay" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction || "move" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction) && this.kickEnemy()
		},
		kickEnemy: function() {
			8 == this._ctx.currentLevelNumber && 2 ==
				this._ctx.currentLevelPart && 1 == this._ctx.currentLevel.tutor.tipsActivate[9] && this._ctx.currentLevel.tutor.closeTip(10);
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("hit");
			this._ctx.kickFirst = !1;
			this._isKickoff = !0;
			this.currentAction = "kick";
			this._timerWarning = this._timerSwitch = 0;
			this._ctx.addObjectsToSave(new Q(this.enemyId, this._x, this.isBoxCovered));
			this.checkShadows()
		},
		CoverTheBox: function() {
			if (1 == this._ctx.currentLevelPart)
				for (var a = 0, b = this._ctx.tempObjectsForSave.length; a < b;) {
					if (this.enemyId ==
						this._ctx.tempObjectsForSave[a].eId) {
						this._ctx.tempObjectsForSave[a].uBox = !0;
						break
					}++a
				}
			if (2 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave2.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave2[a].eId) {
						this._ctx.tempObjectsForSave2[a].uBox = !0;
						break
					}++a
				}
			}
			if (3 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave3.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave3[a].eId) {
						this._ctx.tempObjectsForSave3[a].uBox = !0;
						break
					}++a
				}
			}
			this.owner.remove(this._moviePlayer);
			this._moviePlayer.dispose();
			this._sign.stopAction();
			this.owner.add(a = new g(this._ctx.pack.getTexture("gameObjects/box")));
			a.setScale(this._ctx.gameScale);
			a.centerAnchor();
			a.setXY(this.enemySprite.x._value, this.enemySprite.y._value)
		},
		checkShadows: function() {
			for (var a = 0, b = this._ctx.currentLevel._shadows.length; a < b;) {
				if (Math.abs(this._y - this._ctx.currentLevel._shadows[a].getYPos()) < 30 * this._ctx.currentScaleCoef && this._ctx.currentLevel._shadows[a].checkEnemyInShadow(this._x)) {
					this._inShadow = !0;
					break
				}++a
			}
		},
		changeAction: function(a) {
			this.currentAction = a;
			this.mummyWalking && (this.mummyWalking = !1);
			this.mummyRuning && (this.mummyRuning = !1);
			"move" == this.currentAction && (this._moviePlayer.loop("_Walk", !1), "left" == this._direction && this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), "right" == this._direction && this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), this.mummyWalking || (this.mummyWalking = !0));
			"kicked" == this.currentAction && this._moviePlayer.loop("_Kicked", !1);
			"scream" ==
			this.currentAction && this._moviePlayer.loop("_Scream", !1);
			"run" == this.currentAction && (this._moviePlayer.loop("_Run", !1), this.mummyRuning || (this.mummyRuning = !0));
			"hit" == this.currentAction && (this._movieTimerStop = 1.2, this._moviePlayer.loop("_JumpAttack", !1), this._ctx.pack.getSound("sounds/mummy_attack").play(), this._ctx.currentLevel.gameOver());
			"dead" == this.currentAction && (this._moviePlayer.loop("_Dead", !1), this.enemySprite.setXY(this.enemySprite.x._value, this.enemySprite.y._value + 4 * this._ctx.currentScaleCoef));
			"comeBack" == this.currentAction && this._moviePlayer.loop("_ComeBack", !1)
		},
		checkForBob: function() {
			if (this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow) return !1;
			if (Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - this._x) < 40 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef && !this._ctx.isGameEnd && !this._isKickoff && ("left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this._x || "right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._x)) this._enemyState = "alert", this._timerWarning = 0, this._ctx.currentLevel.globalState = "alert", this._enemyState = "pursuit", this._sign.changeAction("_SignA"), this.changeAction("hit"), this._ctx.isGameEnd || this._ctx.currentLevel.gameOver(), this._movieTimerStop = 0.4, this.changeAction("warning");
			if ("left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value >
				this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), !0;
			return "right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value -
				this._y) < 40 * this._ctx.currentScaleCoef ? (this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), !0) : !1
		},
		IdleEnemy: function() {
			this.mummyWalking && (this.mummyWalking = !1);
			this.mummyRuning && (this.mummyRuning = !1);
			this._enemyIdle = !0;
			this._idleTimer = 0;
			"free" == this._enemyState;
			this.currentAction = "stay";
			this._moviePlayer.loop("_Idle", !1);
			this._ctx.pack.getSound("sounds/mummy_idle").play()
		},
		__class__: Qa
	});
	var xb = function(a, b, c, h, d, s, e, g, f) {
		this._seeEnemyLeft = this._seeEnemyRight = !1;
		this._isChilled = !0;
		this._timerToChill = 0;
		this._isDidWork = this._isPushButton = this._isCry = !1;
		this._idleTimer = this._movieTimer = this._kickTimer = 0;
		this._isKickoff = this._isBalloonShow = this.isStairFind = this._enemyIdle = !1;
		this._timerSwitch = this._timerWarning = this._timerKickoff = 0;
		this._isBobInFocus = this._inShadow = !1;
		this._enemyState = "free";
		this._direction = "right";
		this.ENEMY_SPEED = 0.6;
		this._ctx = a;
		this._x = c * this._ctx.gameScale;
		this._y = h * this._ctx.gameScale;
		this._viewL = this._x - d * this._ctx.gameScale;
		this._viewR = this._x + s * this._ctx.gameScale;
		this._busyPosX = g * this._ctx.gameScale;
		this._redButtonPosX = e * this._ctx.gameScale;
		this._delay = 3;
		this.enemyType = b;
		this.destroyed = new T;
		this.ENEMY_SPEED *= this._ctx.gameScale;
		this.enemyId = f;
		this.isBoxCovered = !1
	};
	f["enemies.Scientist"] = xb;
	xb.__name__ = ["enemies", "Scientist"];
	xb.__super__ = n;
	xb.prototype = q(n.prototype, {
		get_name: function() {
			return "Scientist_26"
		},
		onAdded: function() {
			var a = new M(this._ctx.pack, "scientistAnim");
			this._moviePlayer = new J(a);
			this.owner.add(this._moviePlayer);
			this.enemySprite = new m;
			this.owner.add(this.enemySprite);
			this.enemySprite.setScale(this._ctx.gameScale);
			this.enemySprite.setXY(this._x, this._y);
			this.movePointX = this._x;
			this.movePointY = this._y;
			this.changeAction("move");
			this._sign = new ea(this._ctx, this._x, this._y - 34 * this._ctx.currentScaleCoef);
			this._ctx.currentLevel._screensLayer.addChild((new e).add(this._sign));
			if (!this._ctx.goNextPart) {
				1 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave1);
				2 == this._ctx.currentLevelPart && (this.objectsForSave = this._ctx.objectsForSave2);
				3 == this._ctx.currentLevelPart &&
					(this.objectsForSave = this._ctx.objectsForSave3);
				for (var a = 0, b = this.objectsForSave.length; a < b;) {
					if (this.enemyId == this.objectsForSave[a].eId) {
						this._isKickoff = !0;
						this.changeAction("savedead", this.objectsForSave[a].ePosX, this._y);
						this.objectsForSave[a].uBox ? (this.isBoxCovered = !0, this.CoverTheBox()) : this.checkShadows();
						break
					}++a
				}
			}
		},
		onUpdate: function(a) {
			this._x = this.owner._compMap.Sprite_0.x._value;
			this._y = this.owner._compMap.Sprite_0.y._value;
			this._sign.setCoor(this._x, this._y - 34 * this._ctx.currentScaleCoef);
			if (("dead" == this.currentAction || "savedead" == this.currentAction) && !this._inShadow && !this.isBoxCovered)
				for (var b = 0, c = this._ctx.currentLevel._cameras.length; b < c;) Math.abs(this._y - this._ctx.currentLevel._cameras[b].getYPos()) < 30 * this._ctx.currentScaleCoef && (this._ctx.currentLevel._cameras[b].checkEnemyLeftSide(this._x), this._ctx.currentLevel._cameras[b].checkEnemyRightSide(this._x)), ++b;
			b = 0;
			for (c = this._ctx.levelGuards.length; b < c;) !1 == this._ctx.levelGuards[b].isCovered && (this.checkEnemyLeftSide(this._ctx.levelGuards[b].x,
				this._ctx.levelGuards[b].y), this.checkEnemyRightSide(this._ctx.levelGuards[b].x, this._ctx.levelGuards[b].y)), ++b;
			this.isBoxCovered || this.checkForBaloon();
			this._isKickoff && ("kicked" == this.currentAction && (this._kickTimer += a, this._kickTimer > this._kickTimerStop && this.changeAction("kickOff")), "dead" != this.currentAction && (this._timerKickoff += a), 0.6 < this._timerKickoff && "kickOff" == this.currentAction && this.changeAction("dead"));
			if (("stay" == this.currentAction || "idle2" == this.currentAction) && !this._isKickoff) this._timerSwitch +=
				a, 1.5 < this._timerSwitch && "stay" == this.currentAction && this.changeAction("idle2"), this._timerSwitch > this._delay && (this._timerSwitch = 0, this.changeAction("move"));
			"move" == this.currentAction && !this._isKickoff && ("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewR) > this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value + this.ENEMY_SPEED)) : (this._direction = "left", this._isDidWork = !1, this.IdleEnemy())), "left" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewL) > this.ENEMY_SPEED ?
				(b = this.enemySprite.x, b.set__(b._value - this.ENEMY_SPEED)) : (this._direction = "right", this._isDidWork = !1, this.IdleEnemy())), 5 > Math.abs(this._busyPosX - this.enemySprite.x._value) && !this._isDidWork && (this._isDidWork = !0, this.changeAction("busy")));
			"attentionIdle" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.currentAction = "attentionIdle2", this._enemyState = "free", this._moviePlayer.loop("_AttentionIdle", !1)));
			"attentionIdle2" == this.currentAction &&
				(this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimerStop = 0.8, this._movieTimer = 0, this.IdleEnemy()));
			"busy" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.IdleEnemy()));
			"busyRedButton" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this._ctx.isGameEnd || this._ctx.currentLevel.gameOver()));
			"alert" == this._enemyState && !this._isKickoff && !this._isPushButton && !this._isCry &&
				("right" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewR) > 2 * this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value + 2 * this.ENEMY_SPEED)) : (this._direction = "left", this._isCry = !0, this.changeAction("startCry"))), "left" == this._direction && (Math.abs(this.enemySprite.x._value - this._viewL) > 2 * this.ENEMY_SPEED ? (b = this.enemySprite.x, b.set__(b._value - 2 * this.ENEMY_SPEED)) : (this._direction = "right", this._isCry = !0, this.changeAction("startCry"))), 5 > Math.abs(this._redButtonPosX - this.enemySprite.x._value) &&
					(this._isPushButton = !0, this._ctx.currentLevel.globalState = "alert", this.changeAction("busyRedButton")));
			"startCry" == this.currentAction && (this._movieTimer += a, this._movieTimer > this._movieTimerStop && (this._movieTimer = 0, this.changeAction("cry")));
			this._isChilled || (this._timerToChill += a, 2 < this._timerToChill && (this._timerToChill = 0, this._isChilled = !0, this._sign.stopAction()));
			(this.checkForBob() || this._seeEnemyLeft || this._seeEnemyRight) && !this._isKickoff ? (this._isBobInFocus = !0, this._ctx.currentLevel.talert.set__(5),
				"free" == this._enemyState && (this._enemyState = "warning", this._sign.changeAction("_SignB"), this.changeAction("attention"), this._timerWarning += this._timerToChill, this._isChilled = !1), "warning" == this._enemyState && (this._timerWarning += a, 1 < this._timerWarning && (this._enemyState = "alert", this._sign.changeAction("_SignA"), this.setAlertDirection(), this._movieTimerStop = 0.4, this.changeAction("alert")))) : (this._timerWarning = 0, this._isBobInFocus && (this._isBobInFocus = !1, "warning" == this._enemyState && (this._movieTimerStop =
				0.6, this.currentAction = "attentionIdle", this._enemyState = "free", this._moviePlayer.loop("_AttentionIdle2", !1)), "alert" == this._enemyState && (this._isCry = !1, this._ctx.currentLevel.globalState = "alertTimer", this._sign.changeAction("_SignA"), this.setAlertDirection(), this.changeAction("alert"))))
		},
		checkForBaloon: function() {
			var a = this;
			this._isBalloonShow && null != this._currentBalloon && (i.instance(this._currentBalloon._compMap.Sprite_0, g).setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef,
				this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef), this._ctx.currentLevel.isPlayerTryAction && (this._ctx.currentLevel.isPlayerTryAction = !1, "Scientist" == this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover && (this.isBoxCovered = !0, this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody && this._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox"),
				this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = this.owner, this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "Scientist", this.isStairFind = !1, null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose()))));
			Math.abs(this.enemySprite.x._value - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 20 * this._ctx.currentScaleCoef && Math.abs(this.enemySprite.y._value - this._ctx.currentLevel.player._compMap.Sprite_0.y._value) <
				40 * this._ctx.currentScaleCoef && !this._isKickoff && "alert" != this._ctx.currentLevel.globalState && ("stay" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction || "move" == this._ctx.currentLevel.player._compMap.BobHero_33.currentAction) && this.kickEnemy();
			this.isStairFind = !1;
			if (Math.abs(this._x - this._ctx.currentLevel.player._compMap.Sprite_0.x._value) < 24 * this._ctx.currentScaleCoef && Math.abs(this._y - this._ctx.currentLevel.player._compMap.BobHero_33.getY()) < 30 * this._ctx.currentScaleCoef && this._isKickoff &&
				this._ctx.haveBox && !this._ctx.isGameEnd && !this._ctx.currentLevel.player._compMap.BobHero_33._bobBusy && (this.isStairFind = !0, !1 == this._isBalloonShow)) {
				this._isBalloonShow = !0;
				var b = new g(this._ctx.pack.getTexture("BalloonBox"));
				this._currentBalloon = (new e).add(b);
				this._ctx.currentLevel._bulkheadLayer.addChild(this._currentBalloon);
				this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !0;
				this._ctx.currentLevel.player._compMap.BobHero_33._currentEnemy = this.owner;
				this._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover =
					"Scientist";
				b.setScale(this._ctx.gameScale);
				b.setXY(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - 18 * this._ctx.currentScaleCoef, this._ctx.currentLevel.player._compMap.Sprite_0.y._value - 70 * this._ctx.currentScaleCoef);
				b.get_pointerDown().connect(function() {
					a.isBoxCovered = !0;
					a._ctx.currentLevel.player._compMap.BobHero_33._isNearStair ? a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setboxGostair") : a._ctx.currentLevel.player._compMap.BobHero_33.changeAction("setbox");
					a._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock =
						a.owner;
					a._ctx.currentLevel.player._compMap.BobHero_33._enemyNameCover = "Scientist";
					a.isStairFind = !1;
					null != a._currentBalloon && (a._isBalloonShow = !1, a._ctx.currentLevel._bulkheadLayer.removeChild(a._currentBalloon), a._currentBalloon.dispose())
				})
			}!1 == this.isStairFind && null != this._currentBalloon && (this._isBalloonShow = !1, this._ctx.currentLevel._bulkheadLayer.removeChild(this._currentBalloon), this._currentBalloon.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33._isNearEnemyBody = !1)
		},
		kickEnemy: function() {
			this._ctx.currentLevel.player._compMap.BobHero_33.changeAction("hit");
			this._enemyState = "free";
			this._ctx.kickFirst = !1;
			this._isKickoff = !0;
			this.currentAction = "kicked";
			this._timerWarning = this._timerSwitch = 0;
			this._kickTimerStop = 0.2;
			this._ctx.addObjectsToSave(new Q(this.enemyId, this._x, this.isBoxCovered));
			this.checkShadows()
		},
		CoverTheBox: function() {
			this.isBoxCovered = !0;
			if (1 == this._ctx.currentLevelPart)
				for (var a = 0, b = this._ctx.tempObjectsForSave.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave[a].eId) {
						this._ctx.tempObjectsForSave[a].uBox = !0;
						break
					}++a
				}
			if (2 == this._ctx.currentLevelPart) {
				a =
					0;
				for (b = this._ctx.tempObjectsForSave2.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave2[a].eId) {
						this._ctx.tempObjectsForSave2[a].uBox = !0;
						break
					}++a
				}
			}
			if (3 == this._ctx.currentLevelPart) {
				a = 0;
				for (b = this._ctx.tempObjectsForSave3.length; a < b;) {
					if (this.enemyId == this._ctx.tempObjectsForSave3[a].eId) {
						this._ctx.tempObjectsForSave3[a].uBox = !0;
						break
					}++a
				}
			}
			this.owner.remove(this._moviePlayer);
			this._moviePlayer.dispose();
			this._sign.stopAction();
			this.owner.add(a = new g(this._ctx.pack.getTexture("gameObjects/box")));
			a.setScale(this._ctx.gameScale);
			a.centerAnchor();
			a.setXY(this.enemySprite.x._value, this.enemySprite.y._value + 2 * this._ctx.currentScaleCoef);
			a = 0;
			for (b = this._ctx.levelGuards.length; a < b;) this._ctx.levelGuards[a].guardId == this.enemyId && (this._ctx.levelGuards[a].isCovered = !0), ++a
		},
		checkShadows: function() {
			for (var a = 0, b = this._ctx.currentLevel._shadows.length; a < b;) {
				if (Math.abs(this._y - this._ctx.currentLevel._shadows[a].getYPos()) < 30 * this._ctx.currentScaleCoef && this._ctx.currentLevel._shadows[a].checkEnemyInShadow(this._x)) {
					this._inShadow = !0;
					this._ctx.currentLevel._enemiesLayer.removeChild(this.owner);
					this._ctx.currentLevel._objectsLayer.addChild(this.owner);
					break
				}++a
			}!1 == this._inShadow && this._ctx.levelGuards.push(new Oa(this._x, this._y, this.enemyId))
		},
		changeAction: function(a, b) {
			null == b && (b = 0);
			this.currentAction = a;
			"move" == this.currentAction && (this._moviePlayer.loop("_Walk", !1), "left" == this._direction && this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), "right" == this._direction && this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)));
			"kickOff" == this.currentAction && (this._moviePlayer.loop("_Kicked", !0), this._ctx.pack.getSound("sounds/body_fall").play());
			"dead" == this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value + 5 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this._moviePlayer.loop("_Dead", !0));
			"savedead" == this.currentAction && (this.enemySprite.y.set__(this.enemySprite.y._value + 5 * this._ctx.currentScaleCoef), this._sign.changeAction("_SignC"), this.enemySprite.setXY(b, this.enemySprite.y._value),
				this._moviePlayer.loop("_Dead", !0));
			"attention" == this.currentAction && this._moviePlayer.loop("_Attention", !1);
			"alert" == this.currentAction && this._moviePlayer.loop("_Alert", !1);
			"idle2" == this.currentAction && this._moviePlayer.loop("_Idle2", !1);
			"busy" == this.currentAction && (this._movieTimerStop = 3, this._moviePlayer.loop("_Busy", !0));
			"busyRedButton" == this.currentAction && (this._movieTimerStop = 0.5, this._moviePlayer.loop("_Busy", !0));
			"startCry" == this.currentAction && (this._movieTimerStop = 0.4, this._moviePlayer.loop("_StartCry",
				!0));
			"cry" == this.currentAction && this._moviePlayer.loop("_Cry", !0)
		},
		checkEnemyLeftSide: function(a, b) {
			a - 20 * this._ctx.gameScale < this._x && a > this._viewL && "left" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ? (this._seeEnemyLeft = !0, this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyLeft = !1
		},
		checkEnemyRightSide: function(a, b) {
			a + 20 * this._ctx.gameScale > this._x && a < this._viewR && "right" == this._direction && Math.abs(this._y - b) < 30 * this._ctx.currentScaleCoef ?
				(this._seeEnemyRight = !0, this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value))) : this._seeEnemyRight = !1
		},
		checkForBob: function() {
			if (this._ctx.currentLevel.player._compMap.BobHero_33._bobInShadow) return !1;
			Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.x._value - this._x) < 40 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef && "move" != this.currentAction && !this._isKickoff && "alert" != this._enemyState &&
				(this._enemyState = "alert", this._sign.changeAction("_SignA"), this.setAlertDirection(), this._movieTimerStop = 0.4, this.changeAction("alert"));
			if ("stay" != this.currentAction && "left" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 *
				Math.abs(this.enemySprite.scaleX._value)), !0;
			if ("stay" != this.currentAction && "right" == this._direction && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value < this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), !0;
			if ("attentionIdle2" == this.currentAction) {
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this._viewL - 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value)), this._direction = "left", this.IdleEnemy(), !0;
				if (this._ctx.currentLevel.player._compMap.Sprite_0.x._value > this.enemySprite.x._value && this._ctx.currentLevel.player._compMap.Sprite_0.x._value <
					this._viewR + 10 * this._ctx.currentScaleCoef && Math.abs(this._ctx.currentLevel.player._compMap.Sprite_0.y._value - this._y) < 40 * this._ctx.currentScaleCoef) return this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value)), this._direction = "right", this.IdleEnemy(), !0
			}
			return !1
		},
		IdleEnemy: function() {
			this._enemyIdle = !0;
			this._idleTimer = 0;
			this.currentAction = "stay";
			this._moviePlayer.loop("_Idle", !1);
			this._ctx.pack.getSound("sounds/soldier_idle").play()
		},
		setAlertDirection: function() {
			this.bobDistance =
				Math.abs(this._ctx.currentLevel.player._compMap.BobHero_33.bobSprite.x._value - this._x);
			this.redButtonDistance = Math.abs(this._redButtonPosX - this._x);
			this.deltaDistance = Math.abs(this.bobDistance - this.redButtonDistance);
			this._redButtonPosX < this._x && (this.redButtonSide = "left");
			this._redButtonPosX > this._x && (this.redButtonSide = "right");
			this._ctx.currentLevel.player._compMap.BobHero_33.bobSprite.x._value < this._x && (this.bobSide = "left");
			this._ctx.currentLevel.player._compMap.BobHero_33.bobSprite.x._value >
				this._x && (this.bobSide = "right");
			if ("left" == this.bobSide && "right" == this.redButtonSide || "left" == this.bobSide && "left" == this.redButtonSide && this.redButtonDistance > this.bobDistance || "right" == this.bobSide && "right" == this.redButtonSide && this.redButtonDistance < this.bobDistance) this._direction = "right", this.enemySprite.scaleX.set__(Math.abs(this.enemySprite.scaleX._value));
			if ("right" == this.bobSide && "left" == this.redButtonSide || "left" == this.bobSide && "left" == this.redButtonSide && this.redButtonDistance < this.bobDistance ||
				"right" == this.bobSide && "right" == this.redButtonSide && this.redButtonDistance > this.bobDistance) this._direction = "left", this.enemySprite.scaleX.set__(-1 * Math.abs(this.enemySprite.scaleX._value))
		},
		__class__: xb
	});
	var e = function() {
		this.parent = this.firstChild = this.next = this.firstComponent = null;
		this._compMap = {}
	};
	f["flambe.Entity"] = e;
	e.__name__ = ["flambe", "Entity"];
	e.__interfaces__ = [ca];
	e.prototype = {
		add: function(a) {
			null != a.owner && a.owner.remove(a);
			var b = a.get_name(),
				c = this._compMap[b];
			null != c && this.remove(c);
			this._compMap[b] = a;
			b = null;
			for (c = this.firstComponent; null != c;) b = c, c = c.next;
			null != b ? b.next = a : this.firstComponent = a;
			a.owner = this;
			a.next = null;
			a.onAdded();
			return this
		},
		remove: function(a) {
			for (var b = null, c = this.firstComponent; null != c;) {
				var h = c.next;
				if (c == a) return null == b ? this.firstComponent = h : (b.owner = this, b.next = h), delete this._compMap[c.get_name()], 0 != (c._flags & 1) && (c.onStop(), c._flags &= -2), c.onRemoved(), c.owner = null, c.next = null, !0;
				b = c;
				c = h
			}
			return !1
		},
		addChild: function(a, b) {
			null == b && (b = !0);
			null != a.parent &&
				a.parent.removeChild(a);
			a.parent = this;
			if (b) {
				for (var c = null, h = this.firstChild; null != h;) c = h, h = h.next;
				null != c ? c.next = a : this.firstChild = a
			} else a.next = this.firstChild, this.firstChild = a;
			return this
		},
		removeChild: function(a) {
			for (var b = null, c = this.firstChild; null != c;) {
				var h = c.next;
				if (c == a) {
					null == b ? this.firstChild = h : b.next = h;
					c.parent = null;
					c.next = null;
					break
				}
				b = c;
				c = h
			}
		},
		disposeChildren: function() {
			for (; null != this.firstChild;) this.firstChild.dispose()
		},
		dispose: function() {
			for (null != this.parent && this.parent.removeChild(this); null !=
				this.firstComponent;) this.firstComponent.dispose();
			this.disposeChildren()
		},
		__class__: e
	};
	var id = function() {};
	f["flambe.util.PackageLog"] = id;
	id.__name__ = ["flambe", "util", "PackageLog"];
	var sc = function() {};
	f["flambe.platform.Platform"] = sc;
	sc.__name__ = ["flambe", "platform", "Platform"];
	sc.prototype = {
		__class__: sc
	};
	var da = function() {};
	f["flambe.platform.html.HtmlPlatform"] = da;
	da.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
	da.__interfaces__ = [sc];
	da.prototype = {
		init: function() {
			var a = this;
			u.fixAndroidMath();
			var b = null;
			try {
				b = window.flambe.canvas
			} catch (c) {}
			b.setAttribute("tabindex", "0");
			b.style.outlineStyle = "none";
			b.style.webkitTapHighlightColor = "transparent";
			b.setAttribute("moz-opaque", "true");
			this._stage = new za(b);
			this._pointer = new K;
			this._mouse = new Lb(this._pointer, b);
			this._renderer = this.createRenderer(b);
			this.mainLoop = new Aa;
			this.musicPlaying = !1;
			this._canvas = b;
			this._container = b.parentElement;
			this._container.style.overflow = "hidden";
			this._container.style.position = "relative";
			this._container.style.msTouchAction =
				"none";
			var h = 0,
				d = function(c) {
					if (!(1E3 > c.timeStamp - h)) {
						var d = b.getBoundingClientRect(),
							H = a.getX(c, d),
							d = a.getY(c, d);
						switch (c.type) {
							case "mousedown":
								c.target == b && (c.preventDefault(), a._mouse.submitDown(H, d, c.button), b.focus());
								break;
							case "mousemove":
								a._mouse.submitMove(H, d);
								break;
							case "mouseup":
								a._mouse.submitUp(H, d, c.button);
								break;
							case "mousewheel":
							case "DOMMouseScroll":
								a._mouse.submitScroll(H, d, "mousewheel" == c.type ? c.wheelDelta / 40 : -c.detail) && c.preventDefault()
						}
					}
				};
			window.addEventListener("mousedown",
				d, !1);
			window.addEventListener("mousemove", d, !1);
			window.addEventListener("mouseup", d, !1);
			b.addEventListener("mousewheel", d, !1);
			b.addEventListener("DOMMouseScroll", d, !1);
			b.addEventListener("contextmenu", function(a) {
				a.preventDefault()
			}, !1);
			var s = "undefined" != typeof window.ontouchstart,
				d = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
			if (s || d) {
				var e = new Mb(this._pointer, s ? 4 : window.navigator.msMaxTouchPoints);
				this._touch = e;
				d = function(b) {
					var c;
					c = s ? b.changedTouches : [b];
					var d = b.target.getBoundingClientRect();
					h = b.timeStamp;
					switch (b.type) {
						case "touchstart":
						case "MSPointerDown":
						case "pointerdown":
							b.preventDefault();
							u.SHOULD_HIDE_MOBILE_BROWSER && u.hideMobileBrowser();
							for (b = 0; b < c.length;) {
								var H = c[b];
								++b;
								var g = a.getX(H, d),
									f = a.getY(H, d);
								e.submitDown((s ? H.identifier : H.pointerId) | 0, g, f)
							}
							break;
						case "touchmove":
						case "MSPointerMove":
						case "pointermove":
							b.preventDefault();
							for (b = 0; b < c.length;) H = c[b], ++b, g = a.getX(H, d), f = a.getY(H, d), e.submitMove((s ? H.identifier : H.pointerId) | 0, g, f);
							break;
						case "touchend":
						case "touchcancel":
						case "MSPointerUp":
						case "pointerup":
							for (b =
								0; b < c.length;) H = c[b], ++b, g = a.getX(H, d), f = a.getY(H, d), e.submitUp((s ? H.identifier : H.pointerId) | 0, g, f)
					}
				};
				s ? (b.addEventListener("touchstart", d, !1), b.addEventListener("touchmove", d, !1), b.addEventListener("touchend", d, !1), b.addEventListener("touchcancel", d, !1)) : (b.addEventListener("MSPointerDown", d, !1), b.addEventListener("MSPointerMove", d, !1), b.addEventListener("MSPointerUp", d, !1))
			} else this._touch = new Nb;
			var g = window.onerror;
			window.onerror = function(a, b, c) {
				k.uncaughtError.emit(a);
				return null != g ? g(a, b, c) :
					!1
			};
			var f = u.loadExtension("hidden", window.document);
			null != f.value ? (d = function() {
				k.hidden.set__(N.field(window.document, f.field))
			}, d(null), window.document.addEventListener(f.prefix + "visibilitychange", d, !1)) : (d = function(a) {
				k.hidden.set__("pagehide" == a.type)
			}, window.addEventListener("pageshow", d, !1), window.addEventListener("pagehide", d, !1));
			k.hidden.get_changed().connect(function(b) {
				b || (a._skipFrame = !0)
			});
			this._skipFrame = !1;
			this._lastUpdate = Date.now();
			var i = u.loadExtension("requestAnimationFrame").value;
			if (null != i) {
				var j = window.performance,
					l = null != j && u.polyfill("now", j);
				l ? this._lastUpdate = j.now() : null;
				var m = null,
					m = function(c) {
						a.update(l ? j.now() : c);
						i(m, b)
					};
				i(m, b)
			} else window.setInterval(function() {
				a.update(Date.now())
			}, 16);
			Ua.info("Initialized HTML platform", ["renderer", this._renderer.get_type()])
		},
		loadAssetPack: function(a) {
			return (new v(this, a)).promise
		},
		getStage: function() {
			return this._stage
		},
		getStorage: function() {
			if (null == this._storage) {
				var a = jd.getLocalStorage();
				this._storage = null != a ? new Ob(a) :
					new Pb
			}
			return this._storage
		},
		getLocale: function() {
			var a = window.navigator.language;
			null == a && (a = window.navigator.userLanguage);
			return a
		},
		update: function(a) {
			var b = (a - this._lastUpdate) / 1E3;
			this._lastUpdate = a;
			k.hidden._value || (this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer)))
		},
		getPointer: function() {
			return this._pointer
		},
		getKeyboard: function() {
			var a = this;
			if (null == this._keyboard) {
				this._keyboard = new Z;
				var b = function(b) {
					switch (b.type) {
						case "keydown":
							a._keyboard.submitDown(b.keyCode) &&
								b.preventDefault();
							break;
						case "keyup":
							a._keyboard.submitUp(b.keyCode)
					}
				};
				this._canvas.addEventListener("keydown", b, !1);
				this._canvas.addEventListener("keyup", b, !1)
			}
			return this._keyboard
		},
		getExternal: function() {
			null == this._external && (this._external = new Qb);
			return this._external
		},
		getRenderer: function() {
			return this._renderer
		},
		getX: function(a, b) {
			return (a.clientX - b.left) * this._stage.get_width() / b.width
		},
		getY: function(a, b) {
			return (a.clientY - b.top) * this._stage.get_height() / b.height
		},
		createRenderer: function(a) {
			return new Ba(a)
		},
		__class__: da
	};
	var z = function(a, b) {
		this._value = a;
		this._changed = null != b ? new Va(b) : null
	};
	f["flambe.util.Value"] = z;
	z.__name__ = ["flambe", "util", "Value"];
	z.prototype = {
		watch: function(a) {
			a(this._value, this._value);
			return this.get_changed().connect(a)
		},
		set__: function(a) {
			var b = this._value;
			a != b && (this._value = a, null != this._changed && this._changed.emit(a, b));
			return a
		},
		get_changed: function() {
			null == this._changed && (this._changed = new Va);
			return this._changed
		},
		__class__: z
	};
	var Ca = function(a, b) {
		this._next = null;
		this._signal =
			a;
		this._listener = b;
		this.stayInList = !0
	};
	f["flambe.util.SignalConnection"] = Ca;
	Ca.__name__ = ["flambe", "util", "SignalConnection"];
	Ca.__interfaces__ = [ca];
	Ca.prototype = {
		once: function() {
			this.stayInList = !1;
			return this
		},
		dispose: function() {
			null != this._signal && (this._signal.disconnect(this), this._signal = null)
		},
		__class__: Ca
	};
	var G = function(a) {
		this._head = null != a ? new Ca(this, a) : null;
		this._deferredTasks = null
	};
	f["flambe.util.SignalBase"] = G;
	G.__name__ = ["flambe", "util", "SignalBase"];
	G.prototype = {
		connectImpl: function(a,
			b) {
			var c = this,
				h = new Ca(this, a);
			this._head == G.DISPATCHING_SENTINEL ? this.defer(function() {
				c.listAdd(h, b)
			}) : this.listAdd(h, b);
			return h
		},
		disconnect: function(a) {
			var b = this;
			this._head == G.DISPATCHING_SENTINEL ? this.defer(function() {
				b.listRemove(a)
			}) : this.listRemove(a)
		},
		defer: function(a) {
			for (var b = null, c = this._deferredTasks; null != c;) b = c, c = c.next;
			a = new tc(a);
			null != b ? b.next = a : this._deferredTasks = a
		},
		willEmit: function() {
			var a = this._head;
			this._head = G.DISPATCHING_SENTINEL;
			return a
		},
		didEmit: function(a) {
			this._head =
				a;
			a = this._deferredTasks;
			for (this._deferredTasks = null; null != a;) a.fn(), a = a.next
		},
		listAdd: function(a, b) {
			if (b) a._next = this._head, this._head = a;
			else {
				for (var c = null, h = this._head; null != h;) c = h, h = h._next;
				null != c ? c._next = a : this._head = a
			}
		},
		listRemove: function(a) {
			for (var b = null, c = this._head; null != c;) {
				if (c == a) {
					a = c._next;
					null == b ? this._head = a : b._next = a;
					break
				}
				b = c;
				c = c._next
			}
		},
		__class__: G
	};
	var Va = function(a) {
		G.call(this, a)
	};
	f["flambe.util.Signal2"] = Va;
	Va.__name__ = ["flambe", "util", "Signal2"];
	Va.__super__ = G;
	Va.prototype =
		q(G.prototype, {
			connect: function(a, b) {
				null == b && (b = !1);
				return this.connectImpl(a, b)
			},
			emit: function(a, b) {
				var c = this;
				this._head == G.DISPATCHING_SENTINEL ? this.defer(function() {
					c.emitImpl(a, b)
				}) : this.emitImpl(a, b)
			},
			emitImpl: function(a, b) {
				for (var c = this.willEmit(), h = c; null != h;) h._listener(a, b), h.stayInList || h.dispose(), h = h._next;
				this.didEmit(c)
			},
			__class__: Va
		});
	var x = function(a) {
		G.call(this, a)
	};
	f["flambe.util.Signal1"] = x;
	x.__name__ = ["flambe", "util", "Signal1"];
	x.__super__ = G;
	x.prototype = q(G.prototype, {
		connect: function(a,
			b) {
			null == b && (b = !1);
			return this.connectImpl(a, b)
		},
		emit: function(a) {
			var b = this;
			this._head == G.DISPATCHING_SENTINEL ? this.defer(function() {
				b.emitImpl(a)
			}) : this.emitImpl(a)
		},
		emitImpl: function(a) {
			for (var b = this.willEmit(), c = b; null != c;) c._listener(a), c.stayInList || c.dispose(), c = c._next;
			this.didEmit(b)
		},
		__class__: x
	});
	var y = function(a, b) {
		this._behavior = null;
		z.call(this, a, b)
	};
	f["flambe.animation.AnimatedFloat"] = y;
	y.__name__ = ["flambe", "animation", "AnimatedFloat"];
	y.__super__ = z;
	y.prototype = q(z.prototype, {
		set__: function(a) {
			this._behavior =
				null;
			return z.prototype.set__.call(this, a)
		},
		update: function(a) {
			null != this._behavior && (z.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
		},
		animate: function(a, b, c, h) {
			this.set__(a);
			this.animateTo(b, c, h)
		},
		animateTo: function(a, b, c) {
			this.set_behavior(new Rb(this._value, a, b, c))
		},
		set_behavior: function(a) {
			this._behavior = a;
			this.update(0);
			return a
		},
		__class__: y
	});
	var k = function() {};
	f["flambe.System"] = k;
	k.__name__ = ["flambe", "System"];
	k.init = function() {
		k._calledInit ||
			(k._platform.init(), k._calledInit = !0)
	};
	k.loadAssetPack = function(a) {
		return k._platform.loadAssetPack(a)
	};
	var Ua = function() {};
	f["flambe.Log"] = Ua;
	Ua.__name__ = ["flambe", "Log"];
	Ua.info = function() {
		null
	};
	Ua.__super__ = id;
	Ua.prototype = q(id.prototype, {
		__class__: Ua
	});
	var uc = function() {
		this._realDt = 0
	};
	f["flambe.SpeedAdjuster"] = uc;
	uc.__name__ = ["flambe", "SpeedAdjuster"];
	uc.__super__ = n;
	uc.prototype = q(n.prototype, {
		get_name: function() {
			return "SpeedAdjuster_3"
		},
		onUpdate: function(a) {
			0 < this._realDt && (a = this._realDt, this._realDt =
				0);
			this.scale.update(a)
		},
		__class__: uc
	});
	var vc = function() {};
	f["flambe.animation.Behavior"] = vc;
	vc.__name__ = ["flambe", "animation", "Behavior"];
	vc.prototype = {
		__class__: vc
	};
	var l = function() {};
	f["flambe.animation.Ease"] = l;
	l.__name__ = ["flambe", "animation", "Ease"];
	l.linear = function(a) {
		return a
	};
	l.quadOut = function(a) {
		return a * (2 - a)
	};
	l.sineOut = function(a) {
		return Math.sin(1.5707963267948966 * a)
	};
	l.bounceOut = function(a) {
		return 0.36363636363636365 > a ? 7.5625 * a * a : 0.7272727272727273 > a ? 7.5625 * (a - 0.5454545454545454) *
			(a - 0.5454545454545454) + 0.75 : 0.9090909090909091 > a ? 7.5625 * (a - 0.8181818181818182) * (a - 0.8181818181818182) + 0.9375 : 7.5625 * (a - 0.9545454545454546) * (a - 0.9545454545454546) + 0.984375
	};
	l.circIn = function(a) {
		return 1 - Math.sqrt(1 - a * a)
	};
	l.backIn = function(a) {
		return a * a * (2.70158 * a - 1.70158)
	};
	l.backOut = function(a) {
		return 1 - --a * a * (-2.70158 * a - 1.70158)
	};
	var Rb = function(a, b, c, h) {
		this._from = a;
		this._to = b;
		this._duration = c;
		this.elapsed = 0;
		this._easing = null != h ? h : l.linear
	};
	f["flambe.animation.Tween"] = Rb;
	Rb.__name__ = ["flambe", "animation",
		"Tween"
	];
	Rb.__interfaces__ = [vc];
	Rb.prototype = {
		update: function(a) {
			this.elapsed += a;
			return this.elapsed >= this._duration ? this._to : this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration)
		},
		isComplete: function() {
			return this.elapsed >= this._duration
		},
		__class__: Rb
	};
	var ra = function() {};
	f["flambe.asset.Asset"] = ra;
	ra.__name__ = ["flambe", "asset", "Asset"];
	ra.__interfaces__ = [ca];
	ra.prototype = {
		__class__: ra
	};
	var o = f["flambe.asset.AssetFormat"] = {
		__ename__: ["flambe", "asset", "AssetFormat"],
		__constructs__: "WEBP,JXR,PNG,JPG,GIF,DDS,PVR,PKM,MP3,M4A,OPUS,OGG,WAV,Data".split(",")
	};
	o.WEBP = ["WEBP", 0];
	o.WEBP.toString = j;
	o.WEBP.__enum__ = o;
	o.JXR = ["JXR", 1];
	o.JXR.toString = j;
	o.JXR.__enum__ = o;
	o.PNG = ["PNG", 2];
	o.PNG.toString = j;
	o.PNG.__enum__ = o;
	o.JPG = ["JPG", 3];
	o.JPG.toString = j;
	o.JPG.__enum__ = o;
	o.GIF = ["GIF", 4];
	o.GIF.toString = j;
	o.GIF.__enum__ = o;
	o.DDS = ["DDS", 5];
	o.DDS.toString = j;
	o.DDS.__enum__ = o;
	o.PVR = ["PVR", 6];
	o.PVR.toString = j;
	o.PVR.__enum__ = o;
	o.PKM = ["PKM", 7];
	o.PKM.toString = j;
	o.PKM.__enum__ = o;
	o.MP3 = ["MP3", 8];
	o.MP3.toString = j;
	o.MP3.__enum__ = o;
	o.M4A = ["M4A", 9];
	o.M4A.toString = j;
	o.M4A.__enum__ =
		o;
	o.OPUS = ["OPUS", 10];
	o.OPUS.toString = j;
	o.OPUS.__enum__ = o;
	o.OGG = ["OGG", 11];
	o.OGG.toString = j;
	o.OGG.__enum__ = o;
	o.WAV = ["WAV", 12];
	o.WAV.toString = j;
	o.WAV.__enum__ = o;
	o.Data = ["Data", 13];
	o.Data.toString = j;
	o.Data.__enum__ = o;
	var wc = function(a, b, c, h) {
		this.name = a;
		this.url = b;
		this.format = c;
		this.bytes = h
	};
	f["flambe.asset.AssetEntry"] = wc;
	wc.__name__ = ["flambe", "asset", "AssetEntry"];
	wc.prototype = {
		__class__: wc
	};
	var Sb = function() {};
	f["flambe.asset.AssetPack"] = Sb;
	Sb.__name__ = ["flambe", "asset", "AssetPack"];
	Sb.__interfaces__ = [ca];
	Sb.prototype = {
		__class__: Sb
	};
	var Tb = function() {};
	f["flambe.asset.File"] = Tb;
	Tb.__name__ = ["flambe", "asset", "File"];
	Tb.__interfaces__ = [ra];
	Tb.prototype = {
		__class__: Tb
	};
	var D = function() {
		this._localBase = this._remoteBase = null;
		this._entries = []
	};
	f["flambe.asset.Manifest"] = D;
	D.__name__ = ["flambe", "asset", "Manifest"];
	D.fromAssets = function(a, b) {
		null == b && (b = !0);
		var c = N.field(kd.getType(D).assets[0], a);
		if (null == c) {
			if (b) throw F.withFields("Missing asset pack", ["name", a]);
			return null
		}
		var h = new D;
		h.set_localBase("assets");
		for (var d = 0; d < c.length;) {
			var s = c[d];
			++d;
			var e = s.name,
				g = a + "/" + e + "?v=" + i.string(s.md5),
				f = D.inferFormat(e);
			f != o.Data && (e = F.removeFileExtension(e));
			h.add(e, g, s.bytes, f)
		}
		return h
	};
	D.fromAssetsLocalized = function(a, b, c) {
		null == c && (c = !0);
		null == b && (b = k._platform.getLocale());
		if (null != b)
			for (b = b.split("-"); 0 < b.length;) {
				var h = D.fromAssets(a + "_" + b.join("-"), !1);
				if (null != h) return h;
				b.pop()
			}
		return D.fromAssets(a, c)
	};
	D.inferFormat = function(a) {
		a = F.getUrlExtension(a);
		if (null != a) switch (a.toLowerCase()) {
			case "gif":
				return o.GIF;
			case "jpg":
			case "jpeg":
				return o.JPG;
			case "jxr":
			case "wdp":
				return o.JXR;
			case "png":
				return o.PNG;
			case "webp":
				return o.WEBP;
			case "dds":
				return o.DDS;
			case "pvr":
				return o.PVR;
			case "pkm":
				return o.PKM;
			case "m4a":
				return o.M4A;
			case "mp3":
				return o.MP3;
			case "ogg":
				return o.OGG;
			case "opus":
				return o.OPUS;
			case "wav":
				return o.WAV
		} else null;
		return o.Data
	};
	D.prototype = {
		add: function(a, b, c, h) {
			null == c && (c = 0);
			null == h && (h = D.inferFormat(b));
			a = new wc(a, b, h, c);
			this._entries.push(a);
			return a
		},
		iterator: function() {
			return r.iter(this._entries)
		},
		getFullURL: function(a) {
			var b;
			b = null != this.get_remoteBase() && D._supportsCrossOrigin ? this.get_remoteBase() : this.get_localBase();
			return null != b ? F.joinPath(b, a.url) : a.url
		},
		get_localBase: function() {
			return this._localBase
		},
		set_localBase: function(a) {
			null != a && ld.that(!C.startsWith(a, "http://") && !C.startsWith(a, "https://"), "localBase must be a path on the same domain, NOT starting with http(s)://", null);
			return this._localBase = a
		},
		get_remoteBase: function() {
			return this._remoteBase
		},
		__class__: D
	};
	var A = f["flambe.display.BlendMode"] = {
		__ename__: ["flambe", "display", "BlendMode"],
		__constructs__: "Normal,Add,Multiply,Screen,Mask,Copy".split(",")
	};
	A.Normal = ["Normal", 0];
	A.Normal.toString = j;
	A.Normal.__enum__ = A;
	A.Add = ["Add", 1];
	A.Add.toString = j;
	A.Add.__enum__ = A;
	A.Multiply = ["Multiply", 2];
	A.Multiply.toString = j;
	A.Multiply.__enum__ = A;
	A.Screen = ["Screen", 3];
	A.Screen.toString = j;
	A.Screen.__enum__ = A;
	A.Mask = ["Mask", 4];
	A.Mask.toString = j;
	A.Mask.__enum__ = A;
	A.Copy = ["Copy", 5];
	A.Copy.toString = j;
	A.Copy.__enum__ = A;
	var Ub = function(a, b) {
		null == b && (b = 0);
		null ==
			a && (a = 0);
		this.x = a;
		this.y = b
	};
	f["flambe.math.Point"] = Ub;
	Ub.__name__ = ["flambe", "math", "Point"];
	Ub.prototype = {
		__class__: Ub
	};
	var m = function() {
		this.blendMode = this.scissor = null;
		var a = this;
		this._flags |= 54;
		this._localMatrix = new Da;
		var b = function() {
			a._flags |= 24
		};
		this.x = new y(0, b);
		this.y = new y(0, b);
		this.rotation = new y(0, b);
		this.scaleX = new y(1, b);
		this.scaleY = new y(1, b);
		this.anchorX = new y(0, b);
		this.anchorY = new y(0, b);
		this.alpha = new y(1)
	};
	f["flambe.display.Sprite"] = m;
	m.__name__ = ["flambe", "display", "Sprite"];
	m.hitTest =
		function(a, b, c) {
			var h = a._compMap.Sprite_0;
			if (null != h) {
				if (6 != (h._flags & 6)) return null;
				h.getLocalMatrix().inverseTransform(b, c, m._scratchPoint) && (b = m._scratchPoint.x, c = m._scratchPoint.y);
				var d = h.scissor;
				if (null != d && !d.contains(b, c)) return null
			}
			a = m.hitTestBackwards(a.firstChild, b, c);
			return null != a ? a : null != h && h.containsLocal(b, c) ? h : null
		};
	m.getBounds = function(a, b) {
		null == b && (b = new Vb);
		b.set(1.79769313486231E308, 1.79769313486231E308, -1.79769313486231E308, -1.79769313486231E308);
		m.getBoundsImpl(a, null, b);
		b.width -= b.x;
		b.height -= b.y;
		return b
	};
	m.render = function(a, b) {
		var c = a._compMap.Sprite_0;
		if (null != c) {
			var h = c.alpha._value;
			if (0 == (c._flags & 2) || 0 >= h) return;
			b.save();
			1 > h && b.multiplyAlpha(h);
			null != c.blendMode && b.setBlendMode(c.blendMode);
			var h = c.getLocalMatrix(),
				d = h.m02,
				s = h.m12;
			0 != (c._flags & 32) && (d = Math.round(d), s = Math.round(s));
			b.transform(h.m00, h.m10, h.m01, h.m11, d, s);
			h = c.scissor;
			null != h && b.applyScissor(h.x, h.y, h.width, h.height);
			c.draw(b)
		}
		h = a._compMap.Director_2;
		if (null != h) {
			h = h.occludedScenes;
			for (d = 0; d <
				h.length;) s = h[d], ++d, m.render(s, b)
		}
		for (h = a.firstChild; null != h;) d = h.next, m.render(h, b), h = d;
		null != c && b.restore()
	};
	m.hitTestBackwards = function(a, b, c) {
		if (null != a) {
			var h = m.hitTestBackwards(a.next, b, c);
			return null != h ? h : m.hitTest(a, b, c)
		}
		return null
	};
	m.getBoundsImpl = function(a, b, c) {
		var h = a._compMap.Sprite_0;
		if (null != h) {
			var b = null != b ? Da.multiply(b, h.getLocalMatrix()) : h.getLocalMatrix(),
				d = h.getNaturalWidth(),
				h = h.getNaturalHeight();
			0 < d && 0 < h && (m.extendRect(b, 0, 0, c), m.extendRect(b, d, 0, c), m.extendRect(b, d, h, c),
				m.extendRect(b, 0, h, c))
		}
		d = a._compMap.Director_2;
		if (null != d)
			for (var d = d.occludedScenes, h = 0, s = d.length; h < s;) m.getBoundsImpl(d[h], b, c), ++h;
		for (a = a.firstChild; null != a;) d = a.next, m.getBoundsImpl(a, b, c), a = d
	};
	m.extendRect = function(a, b, c, h) {
		a = a.transform(b, c, m._scratchPoint);
		b = a.x;
		c = a.y;
		b < h.x && (h.x = b);
		c < h.y && (h.y = c);
		b > h.width && (h.width = b);
		c > h.height && (h.height = c)
	};
	m.__super__ = n;
	m.prototype = q(n.prototype, {
		get_name: function() {
			return "Sprite_0"
		},
		getNaturalWidth: function() {
			return 0
		},
		getNaturalHeight: function() {
			return 0
		},
		containsLocal: function(a, b) {
			return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
		},
		getLocalMatrix: function() {
			0 != (this._flags & 8) && (this._flags &= -9, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
			return this._localMatrix
		},
		setAnchor: function(a, b) {
			this.anchorX.set__(a);
			this.anchorY.set__(b);
			return this
		},
		centerAnchor: function() {
			this.anchorX.set__(this.getNaturalWidth() /
				2);
			this.anchorY.set__(this.getNaturalHeight() / 2);
			return this
		},
		setXY: function(a, b) {
			this.x.set__(a);
			this.y.set__(b);
			return this
		},
		setAlpha: function(a) {
			this.alpha.set__(a);
			return this
		},
		setScale: function(a) {
			this.scaleX.set__(a);
			this.scaleY.set__(a);
			return this
		},
		setScaleXY: function(a, b) {
			this.scaleX.set__(a);
			this.scaleY.set__(b);
			return this
		},
		onAdded: function() {
			0 != (this._flags & 64) && this.connectHover()
		},
		onRemoved: function() {
			null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection =
				null)
		},
		onUpdate: function(a) {
			this.x.update(a);
			this.y.update(a);
			this.rotation.update(a);
			this.scaleX.update(a);
			this.scaleY.update(a);
			this.alpha.update(a);
			this.anchorX.update(a);
			this.anchorY.update(a)
		},
		draw: function() {},
		getParentSprite: function() {
			if (null == this.owner) return null;
			for (var a = this.owner.parent; null != a;) {
				var b = a._compMap.Sprite_0;
				if (null != b) return b;
				a = a.parent
			}
			return null
		},
		get_pointerDown: function() {
			null == this._pointerDown && (this._pointerDown = new x);
			return this._pointerDown
		},
		get_pointerUp: function() {
			null ==
				this._pointerUp && (this._pointerUp = new x);
			return this._pointerUp
		},
		connectHover: function() {
			var a = this;
			null == this._hoverConnection && (this._hoverConnection = k._platform.getPointer().move.connect(function(b) {
				for (var c = b.hit; null != c;) {
					if (c == a) return;
					c = c.getParentSprite()
				}
				null != a._pointerOut && 0 != (a._flags & 64) && a._pointerOut.emit(b);
				a._flags &= -65;
				a._hoverConnection.dispose();
				a._hoverConnection = null
			}))
		},
		set_visible: function(a) {
			this._flags = xc.set(this._flags, 2, a);
			return a
		},
		set_pointerEnabled: function(a) {
			this._flags =
				xc.set(this._flags, 4, a);
			return a
		},
		onPointerDown: function(a) {
			this.onHover(a);
			null != this._pointerDown && this._pointerDown.emit(a)
		},
		onPointerMove: function(a) {
			this.onHover(a);
			null != this._pointerMove && this._pointerMove.emit(a)
		},
		onHover: function(a) {
			if (0 == (this._flags & 64) && (this._flags |= 64, null != this._pointerIn || null != this._pointerOut)) null != this._pointerIn && this._pointerIn.emit(a), this.connectHover()
		},
		onPointerUp: function(a) {
			switch (a.source[1]) {
				case 1:
					null != this._pointerOut && 0 != (this._flags & 64) && this._pointerOut.emit(a),
						this._flags &= -65, null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
			}
			null != this._pointerUp && this._pointerUp.emit(a)
		},
		__class__: m
	});
	var fa = function(a, b, c) {
		m.call(this);
		this.color = a;
		this.width = new y(b);
		this.height = new y(c)
	};
	f["flambe.display.FillSprite"] = fa;
	fa.__name__ = ["flambe", "display", "FillSprite"];
	fa.__super__ = m;
	fa.prototype = q(m.prototype, {
		draw: function(a) {
			a.fillRect(this.color, 0, 0, this.width._value, this.height._value)
		},
		getNaturalWidth: function() {
			return this.width._value
		},
		getNaturalHeight: function() {
			return this.height._value
		},
		onUpdate: function(a) {
			m.prototype.onUpdate.call(this, a);
			this.width.update(a);
			this.height.update(a)
		},
		__class__: fa
	});
	var Wb = function(a) {
		this._kernings = null;
		this.xOffset = this.yOffset = this.xAdvance = 0;
		this.page = null;
		this.x = this.y = this.width = this.height = 0;
		this.charCode = a
	};
	f["flambe.display.Glyph"] = Wb;
	Wb.__name__ = ["flambe", "display", "Glyph"];
	Wb.prototype = {
		draw: function(a, b, c) {
			0 < this.width && a.drawSubTexture(this.page, b + this.xOffset, c + this.yOffset, this.x,
				this.y, this.width, this.height)
		},
		getKerning: function(a) {
			return null != this._kernings ? i.int(this._kernings.get(a)) : 0
		},
		setKerning: function(a, b) {
			null == this._kernings && (this._kernings = new X);
			this._kernings.set(a, b)
		},
		__class__: Wb
	};
	var R = function(a, b) {
		this.name = b;
		this._pack = a;
		this._file = a.getFile(b + ".fnt");
		this.reload()
	};
	f["flambe.display.Font"] = R;
	R.__name__ = ["flambe", "display", "Font"];
	R.prototype = {
		layoutText: function(a, b, c, h, d) {
			null == d && (d = 0);
			null == h && (h = 0);
			null == c && (c = 0);
			null == b && (b = U.Left);
			return new sa(this,
				a, b, c, h, d)
		},
		reload: function() {
			this._glyphs = new X;
			this._glyphs.set(R.NEWLINE.charCode, R.NEWLINE);
			for (var a = new Ea(this._file.toString()), b = new X, c = this.name.lastIndexOf("/"), c = 0 <= c ? r.substr(this.name, 0, c + 1) : "", h = a.keywords(); h.hasNext();) switch (h.next()) {
				case "info":
					for (var d = a.pairs(); d.hasNext();) {
						var s = d.next();
						switch (s.key) {
							case "size":
								this.size = s.getInt()
						}
					}
					break;
				case "common":
					for (d = a.pairs(); d.hasNext();) switch (s = d.next(), s.key) {
						case "lineHeight":
							this.lineHeight = s.getInt()
					}
					break;
				case "page":
					for (var d =
							0, s = null, e = a.pairs(); e.hasNext();) {
						var g = e.next();
						switch (g.key) {
							case "id":
								d = g.getInt();
								break;
							case "file":
								s = g.getString()
						}
					}
					s = this._pack.getTexture(c + F.removeFileExtension(s));
					b.set(d, s);
					break;
				case "char":
					d = null;
					for (s = a.pairs(); s.hasNext();) switch (e = s.next(), e.key) {
						case "id":
							d = new Wb(e.getInt());
							break;
						case "x":
							d.x = e.getInt();
							break;
						case "y":
							d.y = e.getInt();
							break;
						case "width":
							d.width = e.getInt();
							break;
						case "height":
							d.height = e.getInt();
							break;
						case "page":
							e = e.getInt();
							d.page = b.get(e);
							break;
						case "xoffset":
							d.xOffset =
								e.getInt();
							break;
						case "yoffset":
							d.yOffset = e.getInt();
							break;
						case "xadvance":
							d.xAdvance = e.getInt()
					}
					this._glyphs.set(d.charCode, d);
					break;
				case "kerning":
					d = null;
					e = s = 0;
					for (g = a.pairs(); g.hasNext();) {
						var f = g.next();
						switch (f.key) {
							case "first":
								d = this._glyphs.get(f.getInt());
								break;
							case "second":
								s = f.getInt();
								break;
							case "amount":
								e = f.getInt()
						}
					}
					null != d && 0 != e && d.setKerning(s, e)
			}
		},
		__class__: R
	};
	var U = f["flambe.display.TextAlign"] = {
		__ename__: ["flambe", "display", "TextAlign"],
		__constructs__: ["Left", "Center", "Right"]
	};
	U.Left = ["Left", 0];
	U.Left.toString = j;
	U.Left.__enum__ = U;
	U.Center = ["Center", 1];
	U.Center.toString = j;
	U.Center.__enum__ = U;
	U.Right = ["Right", 2];
	U.Right.toString = j;
	U.Right.__enum__ = U;
	var sa = function(a, b, c, h, d, e) {
		this.lines = 0;
		var g = this;
		this._font = a;
		this._glyphs = [];
		this._offsets = [];
		this._lineOffset = Math.round(a.lineHeight + e);
		this.bounds = new Vb;
		for (var f = [], e = b.length, i = 0; i < e;) {
			var j = i++,
				j = b.charCodeAt(j),
				j = a._glyphs.get(j);
			null != j ? this._glyphs.push(j) : null
		}
		for (var b = -1, k = 0, l = 0, a = a._glyphs.get(10), e = function() {
				g.bounds.width =
					Fa.max(g.bounds.width, k);
				g.bounds.height += l;
				f[g.lines] = k;
				l = k = 0;
				++g.lines
			}, i = 0; i < this._glyphs.length;) {
			j = this._glyphs[i];
			this._offsets[i] = Math.round(k);
			var m = 0 < h && k + j.width > h;
			m || j == a ? (m && (0 <= b ? (this._glyphs[b] = a, k = this._offsets[b], i = b) : this._glyphs.splice(i, 0, a)), b = -1, l = this._lineOffset, e()) : (32 == j.charCode && (b = i), k += j.xAdvance + d, l = Fa.max(l, j.height + j.yOffset), i + 1 < this._glyphs.length && (k += j.getKerning(this._glyphs[i + 1].charCode)));
			++i
		}
		e();
		d = 0;
		a = sa.getAlignOffset(c, f[0], h);
		b = 1.79769313486231E308;
		e = -1.79769313486231E308;
		j = i = 0;
		for (m = this._glyphs.length; j < m;) {
			var n = this._glyphs[j];
			10 == n.charCode && (d += this._lineOffset, ++i, a = sa.getAlignOffset(c, f[i], h));
			this._offsets[j] += a;
			var o = d + n.yOffset;
			b < o || (b = o);
			e = Fa.max(e, o + n.height);
			++j
		}
		this.bounds.x = sa.getAlignOffset(c, this.bounds.width, h);
		this.bounds.y = b;
		this.bounds.height = e - b
	};
	f["flambe.display.TextLayout"] = sa;
	sa.__name__ = ["flambe", "display", "TextLayout"];
	sa.getAlignOffset = function(a, b, c) {
		switch (a[1]) {
			case 0:
				return 0;
			case 2:
				return c - b;
			case 1:
				return Math.round((c -
					b) / 2)
		}
	};
	sa.prototype = {
		draw: function(a) {
			for (var b = 0, c = 0, h = this._glyphs.length; c < h;) {
				var d = this._glyphs[c];
				10 == d.charCode ? b += this._lineOffset : d.draw(a, this._offsets[c], b);
				++c
			}
		},
		__class__: sa
	};
	var Ea = function(a) {
		this._configText = a;
		this._keywordPattern = new W("([A-Za-z]+)(.*)", "");
		this._pairPattern = new W('([A-Za-z]+)=("[^"]*"|[^\\s]+)', "")
	};
	f["flambe.display._Font.ConfigParser"] = Ea;
	Ea.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
	Ea.advance = function(a, b) {
		var c = b.matchedPos();
		return r.substr(a, c.pos +
			c.len, a.length)
	};
	Ea.prototype = {
		keywords: function() {
			var a = this,
				b = this._configText;
			return {
				next: function() {
					b = Ea.advance(b, a._keywordPattern);
					a._pairText = a._keywordPattern.matched(2);
					return a._keywordPattern.matched(1)
				},
				hasNext: function() {
					return a._keywordPattern.match(b)
				}
			}
		},
		pairs: function() {
			var a = this,
				b = this._pairText;
			return {
				next: function() {
					b = Ea.advance(b, a._pairPattern);
					return new yc(a._pairPattern.matched(1), a._pairPattern.matched(2))
				},
				hasNext: function() {
					return a._pairPattern.match(b)
				}
			}
		},
		__class__: Ea
	};
	var yc = function(a, b) {
		this.key = a;
		this._value = b
	};
	f["flambe.display._Font.ConfigPair"] = yc;
	yc.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
	yc.prototype = {
		getInt: function() {
			return i.parseInt(this._value)
		},
		getString: function() {
			return 34 != this._value.charCodeAt(0) ? null : r.substr(this._value, 1, this._value.length - 2)
		},
		__class__: yc
	};
	var zc = function() {};
	f["flambe.display.Graphics"] = zc;
	zc.__name__ = ["flambe", "display", "Graphics"];
	zc.prototype = {
		__class__: zc
	};
	var g = function(a) {
		m.call(this);
		this.texture = a
	};
	f["flambe.display.ImageSprite"] =
		g;
	g.__name__ = ["flambe", "display", "ImageSprite"];
	g.__super__ = m;
	g.prototype = q(m.prototype, {
		draw: function(a) {
			null != this.texture && a.drawTexture(this.texture, 0, 0)
		},
		getNaturalWidth: function() {
			return null != this.texture ? this.texture.get_width() : 0
		},
		getNaturalHeight: function() {
			return null != this.texture ? this.texture.get_height() : 0
		},
		__class__: g
	});
	var ja = f["flambe.display.Orientation"] = {
		__ename__: ["flambe", "display", "Orientation"],
		__constructs__: ["Portrait", "Landscape"]
	};
	ja.Portrait = ["Portrait", 0];
	ja.Portrait.toString =
		j;
	ja.Portrait.__enum__ = ja;
	ja.Landscape = ["Landscape", 1];
	ja.Landscape.toString = j;
	ja.Landscape.__enum__ = ja;
	var Wa = function(a, b, c) {
		null == c && (c = -1);
		null == b && (b = -1);
		m.call(this);
		this.texture = a;
		0 > b && (b = null != a ? a.get_width() : 0);
		this.width = new y(b);
		0 > c && (c = null != a ? a.get_height() : 0);
		this.height = new y(c)
	};
	f["flambe.display.PatternSprite"] = Wa;
	Wa.__name__ = ["flambe", "display", "PatternSprite"];
	Wa.__super__ = m;
	Wa.prototype = q(m.prototype, {
		draw: function(a) {
			null != this.texture && a.drawPattern(this.texture, 0, 0, this.width._value,
				this.height._value)
		},
		getNaturalWidth: function() {
			return this.width._value
		},
		getNaturalHeight: function() {
			return this.height._value
		},
		onUpdate: function(a) {
			m.prototype.onUpdate.call(this, a);
			this.width.update(a);
			this.height.update(a)
		},
		__class__: Wa
	});
	var Xb = function() {};
	f["flambe.display.Texture"] = Xb;
	Xb.__name__ = ["flambe", "display", "Texture"];
	Xb.__interfaces__ = [ra];
	Xb.prototype = {
		__class__: Xb
	};
	var md = function() {};
	f["flambe.display.SubTexture"] = md;
	md.__name__ = ["flambe", "display", "SubTexture"];
	md.__interfaces__ = [Xb];
	var S = function(a, b) {
		null == b && (b = "");
		this._layout = null;
		var c = this;
		m.call(this);
		this._font = a;
		this._text = b;
		this._align = U.Left;
		this._flags |= 128;
		var h = function() {
			c._flags |= 128
		};
		this.wrapWidth = new y(0, h);
		this.letterSpacing = new y(0, h);
		this.lineSpacing = new y(0, h)
	};
	f["flambe.display.TextSprite"] = S;
	S.__name__ = ["flambe", "display", "TextSprite"];
	S.__super__ = m;
	S.prototype = q(m.prototype, {
		draw: function(a) {
			this.updateLayout();
			this._layout.draw(a)
		},
		getNaturalWidth: function() {
			this.updateLayout();
			return 0 < this.wrapWidth._value ?
				this.wrapWidth._value : this._layout.bounds.width
		},
		getNaturalHeight: function() {
			this.updateLayout();
			var a = this._layout.lines * (this._font.lineHeight + this.lineSpacing._value),
				b = this._layout.bounds.height;
			return a > b ? a : b
		},
		containsLocal: function(a, b) {
			this.updateLayout();
			return this._layout.bounds.contains(a, b)
		},
		setWrapWidth: function(a) {
			this.wrapWidth.set__(a);
			return this
		},
		setAlign: function(a) {
			this.set_align(a);
			return this
		},
		set_text: function(a) {
			a != this._text && (this._text = a, this._flags |= 128);
			return a
		},
		set_font: function(a) {
			a !=
				this._font && (this._font = a, this._flags |= 128);
			return a
		},
		set_align: function(a) {
			a != this._align && (this._align = a, this._flags |= 128);
			return a
		},
		updateLayout: function() {
			0 != (this._flags & 128) && (this._flags &= -129, this._layout = this._font.layoutText(this._text, this._align, this.wrapWidth._value, this.letterSpacing._value, this.lineSpacing._value))
		},
		onUpdate: function(a) {
			m.prototype.onUpdate.call(this, a);
			this.wrapWidth.update(a);
			this.letterSpacing.update(a);
			this.lineSpacing.update(a)
		},
		__class__: S
	});
	var d = f["flambe.input.Key"] = {
		__ename__: ["flambe", "input", "Key"],
		__constructs__: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Number0,Number1,Number2,Number3,Number4,Number5,Number6,Number7,Number8,Number9,Numpad0,Numpad1,Numpad2,Numpad3,Numpad4,Numpad5,Numpad6,Numpad7,Numpad8,Numpad9,NumpadAdd,NumpadDecimal,NumpadDivide,NumpadEnter,NumpadMultiply,NumpadSubtract,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,Left,Up,Right,Down,Alt,Backquote,Backslash,Backspace,CapsLock,Comma,Command,Control,Delete,End,Enter,Equals,Escape,Home,Insert,LeftBracket,Minus,PageDown,PageUp,Period,Quote,RightBracket,Semicolon,Shift,Slash,Space,Tab,Menu,Search,Unknown".split(",")
	};
	d.A = ["A", 0];
	d.A.toString = j;
	d.A.__enum__ = d;
	d.B = ["B", 1];
	d.B.toString = j;
	d.B.__enum__ = d;
	d.C = ["C", 2];
	d.C.toString = j;
	d.C.__enum__ = d;
	d.D = ["D", 3];
	d.D.toString = j;
	d.D.__enum__ = d;
	d.E = ["E", 4];
	d.E.toString = j;
	d.E.__enum__ = d;
	d.F = ["F", 5];
	d.F.toString = j;
	d.F.__enum__ = d;
	d.G = ["G", 6];
	d.G.toString = j;
	d.G.__enum__ = d;
	d.H = ["H", 7];
	d.H.toString = j;
	d.H.__enum__ = d;
	d.I = ["I", 8];
	d.I.toString = j;
	d.I.__enum__ = d;
	d.J = ["J", 9];
	d.J.toString = j;
	d.J.__enum__ = d;
	d.K = ["K", 10];
	d.K.toString = j;
	d.K.__enum__ = d;
	d.L = ["L", 11];
	d.L.toString = j;
	d.L.__enum__ =
		d;
	d.M = ["M", 12];
	d.M.toString = j;
	d.M.__enum__ = d;
	d.N = ["N", 13];
	d.N.toString = j;
	d.N.__enum__ = d;
	d.O = ["O", 14];
	d.O.toString = j;
	d.O.__enum__ = d;
	d.P = ["P", 15];
	d.P.toString = j;
	d.P.__enum__ = d;
	d.Q = ["Q", 16];
	d.Q.toString = j;
	d.Q.__enum__ = d;
	d.R = ["R", 17];
	d.R.toString = j;
	d.R.__enum__ = d;
	d.S = ["S", 18];
	d.S.toString = j;
	d.S.__enum__ = d;
	d.T = ["T", 19];
	d.T.toString = j;
	d.T.__enum__ = d;
	d.U = ["U", 20];
	d.U.toString = j;
	d.U.__enum__ = d;
	d.V = ["V", 21];
	d.V.toString = j;
	d.V.__enum__ = d;
	d.W = ["W", 22];
	d.W.toString = j;
	d.W.__enum__ = d;
	d.X = ["X", 23];
	d.X.toString =
		j;
	d.X.__enum__ = d;
	d.Y = ["Y", 24];
	d.Y.toString = j;
	d.Y.__enum__ = d;
	d.Z = ["Z", 25];
	d.Z.toString = j;
	d.Z.__enum__ = d;
	d.Number0 = ["Number0", 26];
	d.Number0.toString = j;
	d.Number0.__enum__ = d;
	d.Number1 = ["Number1", 27];
	d.Number1.toString = j;
	d.Number1.__enum__ = d;
	d.Number2 = ["Number2", 28];
	d.Number2.toString = j;
	d.Number2.__enum__ = d;
	d.Number3 = ["Number3", 29];
	d.Number3.toString = j;
	d.Number3.__enum__ = d;
	d.Number4 = ["Number4", 30];
	d.Number4.toString = j;
	d.Number4.__enum__ = d;
	d.Number5 = ["Number5", 31];
	d.Number5.toString = j;
	d.Number5.__enum__ =
		d;
	d.Number6 = ["Number6", 32];
	d.Number6.toString = j;
	d.Number6.__enum__ = d;
	d.Number7 = ["Number7", 33];
	d.Number7.toString = j;
	d.Number7.__enum__ = d;
	d.Number8 = ["Number8", 34];
	d.Number8.toString = j;
	d.Number8.__enum__ = d;
	d.Number9 = ["Number9", 35];
	d.Number9.toString = j;
	d.Number9.__enum__ = d;
	d.Numpad0 = ["Numpad0", 36];
	d.Numpad0.toString = j;
	d.Numpad0.__enum__ = d;
	d.Numpad1 = ["Numpad1", 37];
	d.Numpad1.toString = j;
	d.Numpad1.__enum__ = d;
	d.Numpad2 = ["Numpad2", 38];
	d.Numpad2.toString = j;
	d.Numpad2.__enum__ = d;
	d.Numpad3 = ["Numpad3", 39];
	d.Numpad3.toString =
		j;
	d.Numpad3.__enum__ = d;
	d.Numpad4 = ["Numpad4", 40];
	d.Numpad4.toString = j;
	d.Numpad4.__enum__ = d;
	d.Numpad5 = ["Numpad5", 41];
	d.Numpad5.toString = j;
	d.Numpad5.__enum__ = d;
	d.Numpad6 = ["Numpad6", 42];
	d.Numpad6.toString = j;
	d.Numpad6.__enum__ = d;
	d.Numpad7 = ["Numpad7", 43];
	d.Numpad7.toString = j;
	d.Numpad7.__enum__ = d;
	d.Numpad8 = ["Numpad8", 44];
	d.Numpad8.toString = j;
	d.Numpad8.__enum__ = d;
	d.Numpad9 = ["Numpad9", 45];
	d.Numpad9.toString = j;
	d.Numpad9.__enum__ = d;
	d.NumpadAdd = ["NumpadAdd", 46];
	d.NumpadAdd.toString = j;
	d.NumpadAdd.__enum__ = d;
	d.NumpadDecimal = ["NumpadDecimal", 47];
	d.NumpadDecimal.toString = j;
	d.NumpadDecimal.__enum__ = d;
	d.NumpadDivide = ["NumpadDivide", 48];
	d.NumpadDivide.toString = j;
	d.NumpadDivide.__enum__ = d;
	d.NumpadEnter = ["NumpadEnter", 49];
	d.NumpadEnter.toString = j;
	d.NumpadEnter.__enum__ = d;
	d.NumpadMultiply = ["NumpadMultiply", 50];
	d.NumpadMultiply.toString = j;
	d.NumpadMultiply.__enum__ = d;
	d.NumpadSubtract = ["NumpadSubtract", 51];
	d.NumpadSubtract.toString = j;
	d.NumpadSubtract.__enum__ = d;
	d.F1 = ["F1", 52];
	d.F1.toString = j;
	d.F1.__enum__ = d;
	d.F2 = ["F2", 53];
	d.F2.toString =
		j;
	d.F2.__enum__ = d;
	d.F3 = ["F3", 54];
	d.F3.toString = j;
	d.F3.__enum__ = d;
	d.F4 = ["F4", 55];
	d.F4.toString = j;
	d.F4.__enum__ = d;
	d.F5 = ["F5", 56];
	d.F5.toString = j;
	d.F5.__enum__ = d;
	d.F6 = ["F6", 57];
	d.F6.toString = j;
	d.F6.__enum__ = d;
	d.F7 = ["F7", 58];
	d.F7.toString = j;
	d.F7.__enum__ = d;
	d.F8 = ["F8", 59];
	d.F8.toString = j;
	d.F8.__enum__ = d;
	d.F9 = ["F9", 60];
	d.F9.toString = j;
	d.F9.__enum__ = d;
	d.F10 = ["F10", 61];
	d.F10.toString = j;
	d.F10.__enum__ = d;
	d.F11 = ["F11", 62];
	d.F11.toString = j;
	d.F11.__enum__ = d;
	d.F12 = ["F12", 63];
	d.F12.toString = j;
	d.F12.__enum__ = d;
	d.F13 = ["F13", 64];
	d.F13.toString = j;
	d.F13.__enum__ = d;
	d.F14 = ["F14", 65];
	d.F14.toString = j;
	d.F14.__enum__ = d;
	d.F15 = ["F15", 66];
	d.F15.toString = j;
	d.F15.__enum__ = d;
	d.Left = ["Left", 67];
	d.Left.toString = j;
	d.Left.__enum__ = d;
	d.Up = ["Up", 68];
	d.Up.toString = j;
	d.Up.__enum__ = d;
	d.Right = ["Right", 69];
	d.Right.toString = j;
	d.Right.__enum__ = d;
	d.Down = ["Down", 70];
	d.Down.toString = j;
	d.Down.__enum__ = d;
	d.Alt = ["Alt", 71];
	d.Alt.toString = j;
	d.Alt.__enum__ = d;
	d.Backquote = ["Backquote", 72];
	d.Backquote.toString = j;
	d.Backquote.__enum__ = d;
	d.Backslash = ["Backslash", 73];
	d.Backslash.toString = j;
	d.Backslash.__enum__ = d;
	d.Backspace = ["Backspace", 74];
	d.Backspace.toString = j;
	d.Backspace.__enum__ = d;
	d.CapsLock = ["CapsLock", 75];
	d.CapsLock.toString = j;
	d.CapsLock.__enum__ = d;
	d.Comma = ["Comma", 76];
	d.Comma.toString = j;
	d.Comma.__enum__ = d;
	d.Command = ["Command", 77];
	d.Command.toString = j;
	d.Command.__enum__ = d;
	d.Control = ["Control", 78];
	d.Control.toString = j;
	d.Control.__enum__ = d;
	d.Delete = ["Delete", 79];
	d.Delete.toString = j;
	d.Delete.__enum__ = d;
	d.End = ["End", 80];
	d.End.toString = j;
	d.End.__enum__ =
		d;
	d.Enter = ["Enter", 81];
	d.Enter.toString = j;
	d.Enter.__enum__ = d;
	d.Equals = ["Equals", 82];
	d.Equals.toString = j;
	d.Equals.__enum__ = d;
	d.Escape = ["Escape", 83];
	d.Escape.toString = j;
	d.Escape.__enum__ = d;
	d.Home = ["Home", 84];
	d.Home.toString = j;
	d.Home.__enum__ = d;
	d.Insert = ["Insert", 85];
	d.Insert.toString = j;
	d.Insert.__enum__ = d;
	d.LeftBracket = ["LeftBracket", 86];
	d.LeftBracket.toString = j;
	d.LeftBracket.__enum__ = d;
	d.Minus = ["Minus", 87];
	d.Minus.toString = j;
	d.Minus.__enum__ = d;
	d.PageDown = ["PageDown", 88];
	d.PageDown.toString = j;
	d.PageDown.__enum__ =
		d;
	d.PageUp = ["PageUp", 89];
	d.PageUp.toString = j;
	d.PageUp.__enum__ = d;
	d.Period = ["Period", 90];
	d.Period.toString = j;
	d.Period.__enum__ = d;
	d.Quote = ["Quote", 91];
	d.Quote.toString = j;
	d.Quote.__enum__ = d;
	d.RightBracket = ["RightBracket", 92];
	d.RightBracket.toString = j;
	d.RightBracket.__enum__ = d;
	d.Semicolon = ["Semicolon", 93];
	d.Semicolon.toString = j;
	d.Semicolon.__enum__ = d;
	d.Shift = ["Shift", 94];
	d.Shift.toString = j;
	d.Shift.__enum__ = d;
	d.Slash = ["Slash", 95];
	d.Slash.toString = j;
	d.Slash.__enum__ = d;
	d.Space = ["Space", 96];
	d.Space.toString =
		j;
	d.Space.__enum__ = d;
	d.Tab = ["Tab", 97];
	d.Tab.toString = j;
	d.Tab.__enum__ = d;
	d.Menu = ["Menu", 98];
	d.Menu.toString = j;
	d.Menu.__enum__ = d;
	d.Search = ["Search", 99];
	d.Search.toString = j;
	d.Search.__enum__ = d;
	d.Unknown = function(a) {
		a = ["Unknown", 100, a];
		a.__enum__ = d;
		a.toString = j;
		return a
	};
	var Ac = function() {
		this.init(0, null)
	};
	f["flambe.input.KeyboardEvent"] = Ac;
	Ac.__name__ = ["flambe", "input", "KeyboardEvent"];
	Ac.prototype = {
		init: function(a, b) {
			this.id = a;
			this.key = b
		},
		__class__: Ac
	};
	var L = f["flambe.input.MouseButton"] = {
		__ename__: ["flambe",
			"input", "MouseButton"
		],
		__constructs__: ["Left", "Middle", "Right", "Unknown"]
	};
	L.Left = ["Left", 0];
	L.Left.toString = j;
	L.Left.__enum__ = L;
	L.Middle = ["Middle", 1];
	L.Middle.toString = j;
	L.Middle.__enum__ = L;
	L.Right = ["Right", 2];
	L.Right.toString = j;
	L.Right.__enum__ = L;
	L.Unknown = function(a) {
		a = ["Unknown", 3, a];
		a.__enum__ = L;
		a.toString = j;
		return a
	};
	var $ = f["flambe.input.MouseCursor"] = {
		__ename__: ["flambe", "input", "MouseCursor"],
		__constructs__: ["Default", "Button", "None"]
	};
	$.Default = ["Default", 0];
	$.Default.toString = j;
	$.Default.__enum__ =
		$;
	$.Button = ["Button", 1];
	$.Button.toString = j;
	$.Button.__enum__ = $;
	$.None = ["None", 2];
	$.None.toString = j;
	$.None.__enum__ = $;
	var Bc = function() {
		this.init(0, 0, 0, null)
	};
	f["flambe.input.MouseEvent"] = Bc;
	Bc.__name__ = ["flambe", "input", "MouseEvent"];
	Bc.prototype = {
		init: function(a, b, c, h) {
			this.id = a;
			this.viewX = b;
			this.viewY = c;
			this.button = h
		},
		__class__: Bc
	};
	var Yb = f["flambe.input.EventSource"] = {
		__ename__: ["flambe", "input", "EventSource"],
		__constructs__: ["Mouse", "Touch"]
	};
	Yb.Mouse = function(a) {
		a = ["Mouse", 0, a];
		a.__enum__ = Yb;
		a.toString = j;
		return a
	};
	Yb.Touch = function(a) {
		a = ["Touch", 1, a];
		a.__enum__ = Yb;
		a.toString = j;
		return a
	};
	var Cc = function() {
		this.init(0, 0, 0, null, null)
	};
	f["flambe.input.PointerEvent"] = Cc;
	Cc.__name__ = ["flambe", "input", "PointerEvent"];
	Cc.prototype = {
		init: function(a, b, c, h, d) {
			this.id = a;
			this.viewX = b;
			this.viewY = c;
			this.hit = h;
			this.source = d;
			this._stopped = !1
		},
		__class__: Cc
	};
	var Dc = function(a) {
		this.id = a;
		this._source = Yb.Touch(this)
	};
	f["flambe.input.TouchPoint"] = Dc;
	Dc.__name__ = ["flambe", "input", "TouchPoint"];
	Dc.prototype = {
		init: function(a, b) {
			this.viewX = a;
			this.viewY = b
		},
		__class__: Dc
	};
	var Fa = function() {};
	f["flambe.math.FMath"] = Fa;
	Fa.__name__ = ["flambe", "math", "FMath"];
	Fa.max = function(a, b) {
		return a > b ? a : b
	};
	Fa.clamp = function(a, b, c) {
		return a < b ? b : a > c ? c : a
	};
	var Da = function() {
		this.identity()
	};
	f["flambe.math.Matrix"] = Da;
	Da.__name__ = ["flambe", "math", "Matrix"];
	Da.multiply = function(a, b, c) {
		null == c && (c = new Da);
		var h = a.m00 * b.m00 + a.m01 * b.m10,
			d = a.m00 * b.m01 + a.m01 * b.m11,
			e = a.m00 * b.m02 + a.m01 * b.m12 + a.m02;
		c.m00 = h;
		c.m01 = d;
		c.m02 = e;
		h = a.m10 * b.m00 +
			a.m11 * b.m10;
		d = a.m10 * b.m01 + a.m11 * b.m11;
		e = a.m10 * b.m02 + a.m11 * b.m12 + a.m12;
		c.m10 = h;
		c.m11 = d;
		c.m12 = e;
		return c
	};
	Da.prototype = {
		set: function(a, b, c, h, d, e) {
			this.m00 = a;
			this.m01 = c;
			this.m02 = d;
			this.m10 = b;
			this.m11 = h;
			this.m12 = e
		},
		identity: function() {
			this.set(1, 0, 0, 1, 0, 0)
		},
		compose: function(a, b, c, h, d) {
			var e = Math.sin(d),
				d = Math.cos(d);
			this.set(d * c, e * c, -e * h, d * h, a, b)
		},
		translate: function(a, b) {
			this.m02 += this.m00 * a + this.m01 * b;
			this.m12 += this.m11 * b + this.m10 * a
		},
		transform: function(a, b, c) {
			null == c && (c = new Ub);
			c.x = a * this.m00 + b * this.m01 +
				this.m02;
			c.y = a * this.m10 + b * this.m11 + this.m12;
			return c
		},
		determinant: function() {
			return this.m00 * this.m11 - this.m01 * this.m10
		},
		inverseTransform: function(a, b, c) {
			var h = this.determinant();
			if (0 == h) return !1;
			a -= this.m02;
			b -= this.m12;
			c.x = (a * this.m11 - b * this.m01) / h;
			c.y = (b * this.m00 - a * this.m10) / h;
			return !0
		},
		__class__: Da
	};
	var Vb = function(a, b, c, h) {
		null == h && (h = 0);
		null == c && (c = 0);
		null == b && (b = 0);
		null == a && (a = 0);
		this.set(a, b, c, h)
	};
	f["flambe.math.Rectangle"] = Vb;
	Vb.__name__ = ["flambe", "math", "Rectangle"];
	Vb.prototype = {
		set: function(a,
			b, c, h) {
			this.x = a;
			this.y = b;
			this.width = c;
			this.height = h
		},
		contains: function(a, b) {
			a -= this.x;
			if (0 <= this.width) {
				if (0 > a || a > this.width) return !1
			} else if (0 < a || a < this.width) return !1;
			b -= this.y;
			if (0 <= this.height) {
				if (0 > b || b > this.height) return !1
			} else if (0 < b || b < this.height) return !1;
			return !0
		},
		__class__: Vb
	};
	var O = function() {
		this._disposed = !1
	};
	f["flambe.platform.BasicAsset"] = O;
	O.__name__ = ["flambe", "platform", "BasicAsset"];
	O.__interfaces__ = [ra];
	O.prototype = {
		dispose: function() {
			this._disposed || (this._disposed = !0, this.onDisposed())
		},
		onDisposed: function() {
			null
		},
		__class__: O
	};
	var ta = function(a, b) {
		var c = this;
		this.manifest = b;
		this._platform = a;
		this.promise = new Zb;
		this._bytesLoaded = new E;
		this._pack = new $b(b, this);
		var h = sb.array(b);
		if (0 == h.length) this.handleSuccess();
		else {
			for (var d = new E, e = 0; e < h.length;) {
				var g = h[e];
				++e;
				var f = d.get(g.name);
				null == f && (f = [], d.set(g.name, f));
				f.push(g)
			}
			this._assetsRemaining = sb.count(d);
			for (h = d.iterator(); h.hasNext();) d = [h.next()], this.pickBestEntry(d[0], function(a) {
				return function(h) {
					if (null != h) {
						var d = b.getFullURL(h);
						try {
							c.loadEntry(d, h)
						} catch (e) {
							c.handleError(h, "Unexpected error: " + i.string(e))
						}
						d = c.promise;
						d.set_total(d._total + h.bytes)
					} else h = a[0][0], ta.isAudio(h.format) ? c.handleLoad(h, Y.getInstance()) : c.handleError(h, "Could not find a supported format to load")
				}
			}(d))
		}
	};
	f["flambe.platform.BasicAssetPackLoader"] = ta;
	ta.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
	ta.isAudio = function(a) {
		switch (a[1]) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
				return !0;
			default:
				return !1
		}
	};
	ta.prototype = {
		onDisposed: function() {},
		pickBestEntry: function(a, b) {
			this.getAssetFormats(function(c) {
				for (var h = 0; h < c.length;) {
					var d = c[h];
					++h;
					for (var e = 0; e < a.length;) {
						var g = a[e];
						++e;
						if (g.format == d) {
							b(g);
							return
						}
					}
				}
				b(null)
			})
		},
		loadEntry: function() {
			null
		},
		getAssetFormats: function() {
			null
		},
		handleLoad: function(a, b) {
			if (!this._pack.disposed) {
				this.handleProgress(a, a.bytes);
				var c;
				switch (a.format[1]) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						c = this._pack.textures;
						break;
					case 8:
					case 9:
					case 10:
					case 11:
					case 12:
						c = this._pack.sounds;
						break;
					case 13:
						c =
							this._pack.files
				}
				c.set(a.name, b);
				this._assetsRemaining -= 1;
				0 == this._assetsRemaining && this.handleSuccess()
			}
		},
		handleProgress: function(a, b) {
			this._bytesLoaded.set(a.name, b);
			for (var c = 0, h = this._bytesLoaded.iterator(); h.hasNext();) var d = h.next(),
				c = c + d;
			this.promise.set_progress(c)
		},
		handleSuccess: function() {
			this.promise.set_result(this._pack)
		},
		handleError: function(a, b) {
			this.promise.error.emit(F.withFields(b, ["url", a.url]))
		},
		handleTextureError: function(a) {
			this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
		},
		__class__: ta
	};
	var $b = function(a, b) {
		this.disposed = !1;
		this._manifest = a;
		this.loader = b;
		this.textures = new E;
		this.sounds = new E;
		this.files = new E
	};
	f["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = $b;
	$b.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
	$b.__interfaces__ = [Sb];
	$b.prototype = {
		getTexture: function(a, b) {
			null == b && (b = !0);
			var c = this.textures.get(a);
			if (null == c && b) throw F.withFields("Missing texture", ["name", a]);
			return c
		},
		getSound: function(a, b) {
			null == b && (b = !0);
			var c = this.sounds.get(a);
			if (null == c && b) throw F.withFields("Missing sound", ["name", a]);
			return c
		},
		getFile: function(a, b) {
			null == b && (b = !0);
			var c = this.files.get(a);
			if (null == c && b) throw F.withFields("Missing file", ["name", a]);
			return c
		},
		dispose: function() {
			if (!this.disposed) {
				this.disposed = !0;
				for (var a = this.textures.iterator(); a.hasNext();) a.next().dispose();
				this.textures = null;
				for (a = this.sounds.iterator(); a.hasNext();) a.next().dispose();
				this.sounds = null;
				for (a = this.files.iterator(); a.hasNext();) a.next().dispose();
				this.files = null;
				this.loader.onDisposed()
			}
		},
		__class__: $b
	};
	var Xa = function(a) {
		this._disposed = !1;
		this._content = a
	};
	f["flambe.platform.BasicFile"] = Xa;
	Xa.__name__ = ["flambe", "platform", "BasicFile"];
	Xa.__interfaces__ = [Tb];
	Xa.__super__ = O;
	Xa.prototype = q(O.prototype, {
		toString: function() {
			return this._content
		},
		onDisposed: function() {
			this._content = null
		},
		__class__: Xa
	});
	var Ec = function() {};
	f["flambe.subsystem.KeyboardSystem"] = Ec;
	Ec.__name__ = ["flambe", "subsystem", "KeyboardSystem"];
	Ec.prototype = {
		__class__: Ec
	};
	var Z = function() {
		this.down = new x;
		this.up = new x;
		this.backButton =
			new T;
		this._keyStates = new X
	};
	f["flambe.platform.BasicKeyboard"] = Z;
	Z.__name__ = ["flambe", "platform", "BasicKeyboard"];
	Z.__interfaces__ = [Ec];
	Z.prototype = {
		submitDown: function(a) {
			if (16777238 == a) return null != this.backButton._head ? (this.backButton.emit(), !0) : !1;
			this._keyStates.exists(a) || (this._keyStates.set(a, !0), Z._sharedEvent.init(Z._sharedEvent.id + 1, Fc.toKey(a)), this.down.emit(Z._sharedEvent));
			return !0
		},
		submitUp: function(a) {
			this._keyStates.exists(a) && (this._keyStates.remove(a), Z._sharedEvent.init(Z._sharedEvent.id +
				1, Fc.toKey(a)), this.up.emit(Z._sharedEvent))
		},
		__class__: Z
	};
	var pd = function() {};
	f["flambe.subsystem.MouseSystem"] = pd;
	pd.__name__ = ["flambe", "subsystem", "MouseSystem"];
	var V = function(a) {
		this._pointer = a;
		this._source = Yb.Mouse(V._sharedEvent);
		this.down = new x;
		this.move = new x;
		this.up = new x;
		this.scroll = new x;
		this._y = this._x = 0;
		this._cursor = $.Default;
		this._buttonStates = new X
	};
	f["flambe.platform.BasicMouse"] = V;
	V.__name__ = ["flambe", "platform", "BasicMouse"];
	V.__interfaces__ = [pd];
	V.prototype = {
		submitDown: function(a,
			b, c) {
			this._buttonStates.exists(c) || (this._buttonStates.set(c, !0), this.prepare(a, b, Gc.toButton(c)), this._pointer.submitDown(a, b, this._source), this.down.emit(V._sharedEvent))
		},
		submitMove: function(a, b) {
			this.prepare(a, b, null);
			this._pointer.submitMove(a, b, this._source);
			this.move.emit(V._sharedEvent)
		},
		submitUp: function(a, b, c) {
			this._buttonStates.exists(c) && (this._buttonStates.remove(c), this.prepare(a, b, Gc.toButton(c)), this._pointer.submitUp(a, b, this._source), this.up.emit(V._sharedEvent))
		},
		submitScroll: function(a,
			b, c) {
			this._x = a;
			this._y = b;
			if (null == this.scroll._head) return !1;
			this.scroll.emit(c);
			return !0
		},
		prepare: function(a, b, c) {
			this._x = a;
			this._y = b;
			V._sharedEvent.init(V._sharedEvent.id + 1, a, b, c)
		},
		__class__: V
	};
	var Hc = function() {};
	f["flambe.subsystem.PointerSystem"] = Hc;
	Hc.__name__ = ["flambe", "subsystem", "PointerSystem"];
	Hc.prototype = {
		__class__: Hc
	};
	var K = function(a, b, c) {
		null == c && (c = !1);
		null == b && (b = 0);
		null == a && (a = 0);
		this.down = new x;
		this.move = new x;
		this.up = new x;
		this._x = a;
		this._y = b;
		this._isDown = c
	};
	f["flambe.platform.BasicPointer"] =
		K;
	K.__name__ = ["flambe", "platform", "BasicPointer"];
	K.__interfaces__ = [Hc];
	K.prototype = {
		submitDown: function(a, b, c) {
			if (!this._isDown) {
				this.submitMove(a, b, c);
				this._isDown = !0;
				var h = [],
					d = m.hitTest(k.root, a, b);
				if (null != d) {
					var e = d.owner;
					do {
						var g = e._compMap.Sprite_0;
						null != g && h.push(g);
						e = e.parent
					} while (null != e)
				}
				this.prepare(a, b, d, c);
				for (a = 0; a < h.length;)
					if (b = h[a], ++a, b.onPointerDown(K._sharedEvent), K._sharedEvent._stopped) return;
				this.down.emit(K._sharedEvent)
			}
		},
		submitMove: function(a, b, c) {
			if (!(a == this._x && b ==
					this._y)) {
				var h = [],
					d = m.hitTest(k.root, a, b);
				if (null != d) {
					var e = d.owner;
					do {
						var g = e._compMap.Sprite_0;
						null != g && h.push(g);
						e = e.parent
					} while (null != e)
				}
				this.prepare(a, b, d, c);
				for (a = 0; a < h.length;)
					if (b = h[a], ++a, b.onPointerMove(K._sharedEvent), K._sharedEvent._stopped) return;
				this.move.emit(K._sharedEvent)
			}
		},
		submitUp: function(a, b, c) {
			if (this._isDown) {
				this.submitMove(a, b, c);
				this._isDown = !1;
				var h = [],
					d = m.hitTest(k.root, a, b);
				if (null != d) {
					var e = d.owner;
					do {
						var g = e._compMap.Sprite_0;
						null != g && h.push(g);
						e = e.parent
					} while (null !=
						e)
				}
				this.prepare(a, b, d, c);
				for (a = 0; a < h.length;)
					if (b = h[a], ++a, b.onPointerUp(K._sharedEvent), K._sharedEvent._stopped) return;
				this.up.emit(K._sharedEvent)
			}
		},
		prepare: function(a, b, c, h) {
			this._x = a;
			this._y = b;
			K._sharedEvent.init(K._sharedEvent.id + 1, a, b, c, h)
		},
		__class__: K
	};
	var ua = function(a, b, c) {
		this._x = this._y = 0;
		this._parent = null;
		this.rootX = this.rootY = 0;
		this._disposed = !1;
		this.root = a;
		this._width = b;
		this._height = c
	};
	f["flambe.platform.BasicTexture"] = ua;
	ua.__name__ = ["flambe", "platform", "BasicTexture"];
	ua.__interfaces__ = [md];
	ua.__super__ = O;
	ua.prototype = q(O.prototype, {
		subTexture: function(a, b, c, h) {
			c = this.root.createTexture(c, h);
			c._parent = this;
			c._x = a;
			c._y = b;
			c.rootX = this.rootX + a;
			c.rootY = this.rootY + b;
			return c
		},
		onDisposed: function() {
			null == this._parent && this.root.dispose()
		},
		get_width: function() {
			return this._width
		},
		get_height: function() {
			return this._height
		},
		__class__: ua
	});
	var nd = function() {};
	f["flambe.subsystem.TouchSystem"] = nd;
	nd.__name__ = ["flambe", "subsystem", "TouchSystem"];
	var Mb = function(a, b) {
		null == b && (b = 4);
		this._pointer =
			a;
		this._maxPoints = b;
		this._pointMap = new X;
		this._points = [];
		this.down = new x;
		this.move = new x;
		this.up = new x
	};
	f["flambe.platform.BasicTouch"] = Mb;
	Mb.__name__ = ["flambe", "platform", "BasicTouch"];
	Mb.__interfaces__ = [nd];
	Mb.prototype = {
		submitDown: function(a, b, c) {
			if (!this._pointMap.exists(a)) {
				var h = new Dc(a);
				h.init(b, c);
				this._pointMap.set(a, h);
				this._points.push(h);
				null == this._pointerTouch && (this._pointerTouch = h, this._pointer.submitDown(b, c, h._source));
				this.down.emit(h)
			}
		},
		submitMove: function(a, b, c) {
			a = this._pointMap.get(a);
			null != a && (a.init(b, c), this._pointerTouch == a && this._pointer.submitMove(b, c, a._source), this.move.emit(a))
		},
		submitUp: function(a, b, c) {
			var h = this._pointMap.get(a);
			null != h && (h.init(b, c), this._pointMap.remove(a), r.remove(this._points, h), this._pointerTouch == h && (this._pointerTouch = null, this._pointer.submitUp(b, c, h._source)), this.up.emit(h))
		},
		__class__: Mb
	};
	var Ga = function() {};
	f["flambe.sound.Sound"] = Ga;
	Ga.__name__ = ["flambe", "sound", "Sound"];
	Ga.__interfaces__ = [ra];
	Ga.prototype = {
		__class__: Ga
	};
	var Y = function() {
		this._disposed = !1;
		this._playback = new ac(this)
	};
	f["flambe.platform.DummySound"] = Y;
	Y.__name__ = ["flambe", "platform", "DummySound"];
	Y.__interfaces__ = [Ga];
	Y.getInstance = function() {
		null == Y._instance && (Y._instance = new Y);
		return Y._instance
	};
	Y.__super__ = O;
	Y.prototype = q(O.prototype, {
		play: function() {
			return this._playback
		},
		loop: function() {
			return this._playback
		},
		onDisposed: function() {},
		__class__: Y
	});
	var Ha = function() {};
	f["flambe.sound.Playback"] = Ha;
	Ha.__name__ = ["flambe", "sound", "Playback"];
	Ha.__interfaces__ = [ca];
	Ha.prototype = {
		__class__: Ha
	};
	var ac = function(a) {
		this._sound = a;
		this.volume = new y(0);
		this._complete = new z(!0)
	};
	f["flambe.platform.DummyPlayback"] = ac;
	ac.__name__ = ["flambe", "platform", "DummyPlayback"];
	ac.__interfaces__ = [Ha];
	ac.prototype = {
		dispose: function() {},
		__class__: ac
	};
	var bc = function() {};
	f["flambe.subsystem.StorageSystem"] = bc;
	bc.__name__ = ["flambe", "subsystem", "StorageSystem"];
	bc.prototype = {
		__class__: bc
	};
	var Pb = function() {
		this.clear()
	};
	f["flambe.platform.DummyStorage"] = Pb;
	Pb.__name__ = ["flambe", "platform", "DummyStorage"];
	Pb.__interfaces__ = [bc];
	Pb.prototype = {
		get_supported: function() {
			return !1
		},
		set: function(a, b) {
			this._hash.set(a, b);
			return !0
		},
		get: function(a, b) {
			return this._hash.exists(a) ? this._hash.get(a) : b
		},
		clear: function() {
			this._hash = new E
		},
		__class__: Pb
	};
	var Nb = function() {
		this.down = new x;
		this.move = new x;
		this.up = new x
	};
	f["flambe.platform.DummyTouch"] = Nb;
	Nb.__name__ = ["flambe", "platform", "DummyTouch"];
	Nb.__interfaces__ = [nd];
	Nb.prototype = {
		__class__: Nb
	};
	var Ya = function() {
		this._entries = []
	};
	f["flambe.platform.EventGroup"] =
		Ya;
	Ya.__name__ = ["flambe", "platform", "EventGroup"];
	Ya.__interfaces__ = [ca];
	Ya.prototype = {
		addListener: function(a, b, c) {
			a.addEventListener(b, c, !1);
			this._entries.push(new Ic(a, b, c))
		},
		addDisposingListener: function(a, b, c) {
			var h = this;
			this.addListener(a, b, function(a) {
				h.dispose();
				c(a)
			})
		},
		dispose: function() {
			for (var a = 0, b = this._entries; a < b.length;) {
				var c = b[a];
				++a;
				c.dispatcher.removeEventListener(c.type, c.listener, !1)
			}
			this._entries = []
		},
		__class__: Ya
	};
	var Ic = function(a, b, c) {
		this.dispatcher = a;
		this.type = b;
		this.listener =
			c
	};
	f["flambe.platform._EventGroup.Entry"] = Ic;
	Ic.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
	Ic.prototype = {
		__class__: Ic
	};
	var cc = function() {};
	f["flambe.platform.InternalGraphics"] = cc;
	cc.__name__ = ["flambe", "platform", "InternalGraphics"];
	cc.__interfaces__ = [zc];
	cc.prototype = {
		__class__: cc
	};
	var Jc = function() {};
	f["flambe.subsystem.RendererSystem"] = Jc;
	Jc.__name__ = ["flambe", "subsystem", "RendererSystem"];
	Jc.prototype = {
		__class__: Jc
	};
	var dc = function() {};
	f["flambe.platform.InternalRenderer"] = dc;
	dc.__name__ = ["flambe", "platform", "InternalRenderer"];
	dc.__interfaces__ = [Jc];
	dc.prototype = {
		__class__: dc
	};
	var Fc = function() {};
	f["flambe.platform.KeyCodes"] = Fc;
	Fc.__name__ = ["flambe", "platform", "KeyCodes"];
	Fc.toKey = function(a) {
		switch (a) {
			case 65:
				return d.A;
			case 66:
				return d.B;
			case 67:
				return d.C;
			case 68:
				return d.D;
			case 69:
				return d.E;
			case 70:
				return d.F;
			case 71:
				return d.G;
			case 72:
				return d.H;
			case 73:
				return d.I;
			case 74:
				return d.J;
			case 75:
				return d.K;
			case 76:
				return d.L;
			case 77:
				return d.M;
			case 78:
				return d.N;
			case 79:
				return d.O;
			case 80:
				return d.P;
			case 81:
				return d.Q;
			case 82:
				return d.R;
			case 83:
				return d.S;
			case 84:
				return d.T;
			case 85:
				return d.U;
			case 86:
				return d.V;
			case 87:
				return d.W;
			case 88:
				return d.X;
			case 89:
				return d.Y;
			case 90:
				return d.Z;
			case 48:
				return d.Number0;
			case 49:
				return d.Number1;
			case 50:
				return d.Number2;
			case 51:
				return d.Number3;
			case 52:
				return d.Number4;
			case 53:
				return d.Number5;
			case 54:
				return d.Number6;
			case 55:
				return d.Number7;
			case 56:
				return d.Number8;
			case 57:
				return d.Number9;
			case 96:
				return d.Numpad0;
			case 97:
				return d.Numpad1;
			case 98:
				return d.Numpad2;
			case 99:
				return d.Numpad3;
			case 100:
				return d.Numpad4;
			case 101:
				return d.Numpad5;
			case 102:
				return d.Numpad6;
			case 103:
				return d.Numpad7;
			case 104:
				return d.Numpad8;
			case 105:
				return d.Numpad9;
			case 107:
				return d.NumpadAdd;
			case 110:
				return d.NumpadDecimal;
			case 111:
				return d.NumpadDivide;
			case 108:
				return d.NumpadEnter;
			case 106:
				return d.NumpadMultiply;
			case 109:
				return d.NumpadSubtract;
			case 112:
				return d.F1;
			case 113:
				return d.F2;
			case 114:
				return d.F3;
			case 115:
				return d.F4;
			case 116:
				return d.F5;
			case 117:
				return d.F6;
			case 118:
				return d.F7;
			case 119:
				return d.F8;
			case 120:
				return d.F9;
			case 121:
				return d.F10;
			case 122:
				return d.F11;
			case 123:
				return d.F12;
			case 37:
				return d.Left;
			case 38:
				return d.Up;
			case 39:
				return d.Right;
			case 40:
				return d.Down;
			case 18:
				return d.Alt;
			case 192:
				return d.Backquote;
			case 220:
				return d.Backslash;
			case 8:
				return d.Backspace;
			case 20:
				return d.CapsLock;
			case 188:
				return d.Comma;
			case 15:
				return d.Command;
			case 17:
				return d.Control;
			case 46:
				return d.Delete;
			case 35:
				return d.End;
			case 13:
				return d.Enter;
			case 187:
				return d.Equals;
			case 27:
				return d.Escape;
			case 36:
				return d.Home;
			case 45:
				return d.Insert;
			case 219:
				return d.LeftBracket;
			case 189:
				return d.Minus;
			case 34:
				return d.PageDown;
			case 33:
				return d.PageUp;
			case 190:
				return d.Period;
			case 222:
				return d.Quote;
			case 221:
				return d.RightBracket;
			case 186:
				return d.Semicolon;
			case 16:
				return d.Shift;
			case 191:
				return d.Slash;
			case 32:
				return d.Space;
			case 9:
				return d.Tab;
			case 16777234:
				return d.Menu;
			case 16777247:
				return d.Search
		}
		return d.Unknown(a)
	};
	var Aa = function() {
		this._tickables = []
	};
	f["flambe.platform.MainLoop"] =
		Aa;
	Aa.__name__ = ["flambe", "platform", "MainLoop"];
	Aa.updateEntity = function(a, b) {
		var c = a._compMap.SpeedAdjuster_3;
		if (null != c && (c._realDt = b, b *= c.scale._value, 0 >= b)) {
			c.onUpdate(b);
			return
		}
		for (c = a.firstComponent; null != c;) {
			var h = c.next;
			0 == (c._flags & 1) && (c._flags |= 1, c.onStart());
			c.onUpdate(b);
			c = h
		}
		for (c = a.firstChild; null != c;) h = c.next, Aa.updateEntity(c, b), c = h
	};
	Aa.prototype = {
		update: function(a) {
			if (!(0 >= a)) {
				1 < a && (a = 1);
				for (var b = 0; b < this._tickables.length;) {
					var c = this._tickables[b];
					null == c || c.update(a) ? this._tickables.splice(b,
						1) : ++b
				}
				k.volume.update(a);
				Aa.updateEntity(k.root, a)
			}
		},
		render: function(a) {
			var b = a.graphics;
			null != b && (a.willRender(), m.render(k.root, b), a.didRender())
		},
		addTickable: function(a) {
			this._tickables.push(a)
		},
		__class__: Aa
	};
	var Gc = function() {};
	f["flambe.platform.MouseCodes"] = Gc;
	Gc.__name__ = ["flambe", "platform", "MouseCodes"];
	Gc.toButton = function(a) {
		switch (a) {
			case 0:
				return L.Left;
			case 1:
				return L.Middle;
			case 2:
				return L.Right
		}
		return L.Unknown(a)
	};
	var Kc = function() {};
	f["flambe.platform.TextureRoot"] = Kc;
	Kc.__name__ = ["flambe", "platform", "TextureRoot"];
	Kc.prototype = {
		__class__: Kc
	};
	var ec = function() {};
	f["flambe.platform.Tickable"] = ec;
	ec.__name__ = ["flambe", "platform", "Tickable"];
	ec.prototype = {
		__class__: ec
	};
	var fc = function(a, b) {
		this._firstDraw = !1;
		this._canvasCtx = a.getContext("2d", {
			alpha: b
		})
	};
	f["flambe.platform.html.CanvasGraphics"] = fc;
	fc.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
	fc.__interfaces__ = [cc];
	fc.prototype = {
		save: function() {
			this._canvasCtx.save()
		},
		transform: function(a, b, c, h, d, e) {
			this._canvasCtx.transform(a,
				b, c, h, d, e)
		},
		restore: function() {
			this._canvasCtx.restore()
		},
		drawTexture: function(a, b, c) {
			this.drawSubTexture(a, b, c, 0, 0, a.get_width(), a.get_height())
		},
		drawSubTexture: function(a, b, c, h, d, e, g) {
			this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubTexture(a, b, c, h, d, e, g), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.root.image, a.rootX + h | 0, a.rootY + d | 0, e | 0, g | 0, b | 0, c | 0, e | 0, g | 0)
		},
		drawPattern: function(a, b, c, h, d) {
			this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawPattern(a, b, c, h, d), this._canvasCtx.globalCompositeOperation = "source-over") : (this._canvasCtx.fillStyle = a.getPattern(), this._canvasCtx.fillRect(b | 0, c | 0, h | 0, d | 0))
		},
		fillRect: function(a, b, c, h, d) {
			if (this._firstDraw) this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.fillRect(a, b, c, h, d), this._canvasCtx.globalCompositeOperation = "source-over";
			else {
				for (a = (16777215 & a).toString(16); 6 > a.length;) a = "0" + i.string(a);
				this._canvasCtx.fillStyle =
					"#" + i.string(a);
				this._canvasCtx.fillRect(b | 0, c | 0, h | 0, d | 0)
			}
		},
		multiplyAlpha: function(a) {
			this._canvasCtx.globalAlpha *= a
		},
		setBlendMode: function(a) {
			var b;
			switch (a[1]) {
				case 0:
					b = "source-over";
					break;
				case 1:
					b = "lighter";
					break;
				case 2:
					b = "multiply";
					break;
				case 3:
					b = "screen";
					break;
				case 4:
					b = "destination-in";
					break;
				case 5:
					b = "copy"
			}
			this._canvasCtx.globalCompositeOperation = b
		},
		applyScissor: function(a, b, c, h) {
			this._canvasCtx.beginPath();
			this._canvasCtx.rect(a | 0, b | 0, c | 0, h | 0);
			this._canvasCtx.clip()
		},
		willRender: function() {
			this._firstDraw = !0
		},
		didRender: function() {},
		__class__: fc
	};
	var Ba = function(a) {
		this.graphics = new fc(a, !1);
		this._hasGPU = new z(!0)
	};
	f["flambe.platform.html.CanvasRenderer"] = Ba;
	Ba.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
	Ba.__interfaces__ = [dc];
	Ba.prototype = {
		get_type: function() {
			return aa.Canvas
		},
		createTextureFromImage: function(a) {
			a = new Za(Ba.CANVAS_TEXTURES ? u.createCanvas(a) : a);
			return a.createTexture(a.width, a.height)
		},
		getCompressedTextureFormats: function() {
			return []
		},
		createCompressedTexture: function() {
			return null
		},
		willRender: function() {
			this.graphics.willRender()
		},
		didRender: function() {
			this.graphics.didRender()
		},
		__class__: Ba
	};
	var gc = function(a, b, c) {
		this._rootUpdateCount = 0;
		this._pattern = null;
		ua.call(this, a, b, c)
	};
	f["flambe.platform.html.CanvasTexture"] = gc;
	gc.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
	gc.__super__ = ua;
	gc.prototype = q(ua.prototype, {
		getPattern: function() {
			if (this._rootUpdateCount != this.root.updateCount || null == this._pattern) this._rootUpdateCount = this.root.updateCount, this._pattern = this.root.createPattern(this.rootX,
				this.rootY, this._width, this._height);
			return this._pattern
		},
		__class__: gc
	});
	var Za = function(a) {
		this._graphics = null;
		this.updateCount = 0;
		this._disposed = !1;
		this.image = a;
		this.width = a.width;
		this.height = a.height
	};
	f["flambe.platform.html.CanvasTextureRoot"] = Za;
	Za.__name__ = ["flambe", "platform", "html", "CanvasTextureRoot"];
	Za.__interfaces__ = [Kc];
	Za.__super__ = O;
	Za.prototype = q(O.prototype, {
		createTexture: function(a, b) {
			return new gc(this, a, b)
		},
		createPattern: function(a, b, c, h) {
			var d = this.getContext2d(),
				e = this.image;
			if (0 != a || 0 != b || c != this.width || h != this.height) e = u.createEmptyCanvas(c, h), c = e.getContext("2d"), c.globalCompositeOperation = "copy", c.drawImage(this.image, -a, -b);
			return d.createPattern(e, "repeat")
		},
		getContext2d: function() {
			I.__instanceof(this.image, HTMLCanvasElement) || (this.image = u.createCanvas(this.image));
			return this.image.getContext("2d")
		},
		onDisposed: function() {
			this._graphics = this.image = null
		},
		__class__: Za
	});
	var v = function(a, b) {
		ta.call(this, a, b)
	};
	f["flambe.platform.html.HtmlAssetPackLoader"] = v;
	v.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
	v.detectImageFormats = function(a) {
		var b = [o.PNG, o.JPG, o.GIF],
			c = 2,
			h;
		h = window.document.createElement("img");
		h.onload = h.onerror = function() {
			1 == h.width && b.unshift(o.WEBP);
			--c;
			0 == c && a(b)
		};
		h.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
		var d;
		d = window.document.createElement("img");
		d.onload = d.onerror = function() {
			1 == d.width && b.unshift(o.JXR);
			--c;
			0 == c && a(b)
		};
		d.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
	};
	v.detectAudioFormats = function() {
		var a;
		a = window.document.createElement("audio");
		if (null == a || null == Ka(a, a.canPlayType)) return [];
		var b = new W("\\b(iPhone|iPod|iPad|Windows Phone)\\b", ""),
			c = window.navigator.userAgent;
		if (!w.get_supported() && b.match(c)) return [];
		for (var b = [{
				format: o.M4A,
				mimeType: "audio/mp4; codecs=mp4a"
			}, {
				format: o.MP3,
				mimeType: "audio/mpeg"
			}, {
				format: o.OPUS,
				mimeType: "audio/ogg; codecs=opus"
			}, {
				format: o.OGG,
				mimeType: "audio/ogg; codecs=vorbis"
			}, {
				format: o.WAV,
				mimeType: "audio/wav"
			}], c = [], h = 0; h <
			b.length;) {
			var d = b[h];
			++h;
			var e = "";
			try {
				e = a.canPlayType(d.mimeType)
			} catch (g) {}
			"" != e && c.push(d.format)
		}
		return c
	};
	v.supportsBlob = function() {
		if (v._detectBlobSupport) {
			v._detectBlobSupport = !1;
			if ((new W("\\bSilk\\b", "")).match(window.navigator.userAgent) || null == window.Blob) return !1;
			var a = new XMLHttpRequest;
			a.open("GET", ".", !0);
			if ("" != a.responseType) return !1;
			a.responseType = "blob";
			if ("blob" != a.responseType) return !1;
			v._URL = u.loadExtension("URL").value
		}
		return null != v._URL && null != v._URL.createObjectURL
	};
	v.__super__ =
		ta;
	v.prototype = q(ta.prototype, {
		loadEntry: function(a, b) {
			var c = this;
			switch (b.format[1]) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					var h;
					h = window.document.createElement("img");
					var d = new Ya;
					d.addDisposingListener(h, "load", function() {
						v.supportsBlob() && v._URL.revokeObjectURL(h.src);
						var a = c._platform.getRenderer().createTextureFromImage(h);
						null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
					});
					d.addDisposingListener(h, "error", function() {
						c.handleError(b, "Failed to load image")
					});
					v.supportsBlob() ? this.download(a, b,
						"blob",
						function(a) {
							h.src = v._URL.createObjectURL(a)
						}) : h.src = a;
					break;
				case 5:
				case 6:
				case 7:
					this.download(a, b, "arraybuffer", function() {
						var a = c._platform.getRenderer().createCompressedTexture(b.format, null);
						null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
					});
					break;
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
					if (w.get_supported()) this.download(a, b, "arraybuffer", function(a) {
						w.ctx.decodeAudioData(a, function(a) {
							c.handleLoad(b, new w(a))
						}, function() {
							c.handleLoad(b, Y.getInstance())
						})
					});
					else {
						var e;
						e = window.document.createElement("audio");
						e.preload = "auto";
						var g = ++v._mediaRefCount;
						null == v._mediaElements && (v._mediaElements = new X);
						v._mediaElements.set(g, e);
						d = new Ya;
						d.addDisposingListener(e, "canplaythrough", function() {
							v._mediaElements.remove(g);
							c.handleLoad(b, new $a(e))
						});
						d.addDisposingListener(e, "error", function() {
							v._mediaElements.remove(g);
							var a = e.error.code;
							3 == a || 4 == a ? c.handleLoad(b, Y.getInstance()) : c.handleError(b, "Failed to load audio: " + e.error.code)
						});
						d.addListener(e, "progress", function() {
							if (0 < e.buffered.length && 0 < e.duration) {
								var a =
									e.buffered.end(0) / e.duration;
								c.handleProgress(b, a * b.bytes | 0)
							}
						});
						e.src = a;
						e.load()
					}
					break;
				case 13:
					this.download(a, b, "text", function(a) {
						c.handleLoad(b, new Xa(a))
					})
			}
		},
		getAssetFormats: function(a) {
			var b = this;
			null == v._supportedFormats && (v._supportedFormats = new Zb, v.detectImageFormats(function(a) {
				v._supportedFormats.set_result(b._platform.getRenderer().getCompressedTextureFormats().concat(a).concat(v.detectAudioFormats()).concat([o.Data]))
			}));
			v._supportedFormats.get(a)
		},
		download: function(a, b, c, h) {
			var d = this,
				e = null,
				g = null,
				f = 0,
				i = !1,
				j = function() {
					i && (i = !1, window.clearInterval(f))
				},
				k = 3,
				l = function() {
					--k;
					return 0 <= k ? (g(), !0) : !1
				},
				g = function() {
					j();
					null != e && e.abort();
					e = new XMLHttpRequest;
					e.open("GET", a, !0);
					e.responseType = c;
					var g = 0;
					e.onprogress = function(a) {
						i || (i = !0, f = window.setInterval(function() {
							4 != e.readyState && 5E3 < Date.now() - g && !l() && (j(), d.handleError(b, "Download stalled"))
						}, 1E3));
						g = Date.now();
						d.handleProgress(b, a.loaded)
					};
					e.onerror = function() {
						if (0 != e.status || !l()) j(), d.handleError(b, "HTTP error " + e.status)
					};
					e.onload = function() {
						var a = e.response;
						null == a && (a = e.responseText);
						j();
						h(a)
					};
					e.send()
				};
			g()
		},
		__class__: v
	});
	var Lc = function() {};
	f["flambe.subsystem.ExternalSystem"] = Lc;
	Lc.__name__ = ["flambe", "subsystem", "ExternalSystem"];
	Lc.prototype = {
		__class__: Lc
	};
	var Qb = function() {};
	f["flambe.platform.html.HtmlExternal"] = Qb;
	Qb.__name__ = ["flambe", "platform", "html", "HtmlExternal"];
	Qb.__interfaces__ = [Lc];
	Qb.prototype = {
		call: function(a, b) {
			null == b && (b = []);
			for (var c = window, h = c, d = 0, e = a.split("."); d < e.length;) {
				var g = e[d];
				++d;
				c = h;
				h = N.field(c, g)
			}
			return h.apply(c, b)
		},
		__class__: Qb
	};
	var Lb = function(a, b) {
		V.call(this, a);
		this._canvas = b
	};
	f["flambe.platform.html.HtmlMouse"] = Lb;
	Lb.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
	Lb.__super__ = V;
	Lb.prototype = q(V.prototype, {
		__class__: Lb
	});
	var $a = function(a) {
		this._disposed = !1;
		this.audioElement = a
	};
	f["flambe.platform.html.HtmlSound"] = $a;
	$a.__name__ = ["flambe", "platform", "html", "HtmlSound"];
	$a.__interfaces__ = [Ga];
	$a.__super__ = O;
	$a.prototype = q(O.prototype, {
		play: function(a) {
			null == a && (a =
				1);
			return new ab(this, a, !1)
		},
		loop: function(a) {
			null == a && (a = 1);
			return new ab(this, a, !0)
		},
		onDisposed: function() {
			this.audioElement = null
		},
		__class__: $a
	});
	var ab = function(a, b, c) {
		var d = this;
		this._sound = a;
		this._tickableAdded = !1;
		this._clonedElement = window.document.createElement("audio");
		this._clonedElement.loop = c;
		this._clonedElement.src = a.audioElement.src;
		this.volume = new y(b, function() {
			d.updateVolume()
		});
		this.updateVolume();
		this._complete = new z(!1);
		this.playAudio();
		k.hidden._value && this.set_paused(!0)
	};
	f["flambe.platform.html._HtmlSound.HtmlPlayback"] =
		ab;
	ab.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
	ab.__interfaces__ = [ec, Ha];
	ab.prototype = {
		set_paused: function(a) {
			this._clonedElement.paused != a && (a ? this._clonedElement.pause() : this.playAudio());
			return a
		},
		update: function(a) {
			this.volume.update(a);
			this._complete.set__(this._clonedElement.ended);
			return this._complete._value || this._clonedElement.paused ? (this._tickableAdded = !1, this._volumeBinding.dispose(), this._hideBinding.dispose(), !0) : !1
		},
		dispose: function() {
			this.set_paused(!0);
			this._complete.set__(!0)
		},
		playAudio: function() {
			var a = this;
			this._clonedElement.loop && !da.instance.musicPlaying && (da.instance.musicPlaying = !0, this._clonedElement.play(), this._tickableAdded || (da.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._volumeBinding = k.volume.get_changed().connect(function() {
				a.updateVolume()
			}), this._hideBinding = k.hidden.get_changed().connect(function(b) {
				b ? (a._wasPaused = a._clonedElement.paused, a.set_paused(!0)) : a.set_paused(a._wasPaused)
			})))
		},
		updateVolume: function() {
			this._clonedElement.volume =
				k.volume._value * this.volume._value
		},
		__class__: ab
	};
	var Mc = function() {};
	f["flambe.subsystem.StageSystem"] = Mc;
	Mc.__name__ = ["flambe", "subsystem", "StageSystem"];
	Mc.prototype = {
		__class__: Mc
	};
	var za = function(a) {
		var b = this;
		this._canvas = a;
		this.resize = new T;
		this.scaleFactor = za.computeScaleFactor();
		1 != this.scaleFactor && (u.setVendorStyle(this._canvas, "transform-origin", "top left"), u.setVendorStyle(this._canvas, "transform", "scale(" + 1 / this.scaleFactor + ")"));
		u.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange",
			function() {
				u.callLater(Ka(b, b.hideMobileBrowser), 200)
			}, !1), this.hideMobileBrowser());
		window.addEventListener("resize", Ka(this, this.onWindowResize), !1);
		this.onWindowResize(null);
		this.orientation = new z(null);
		null != window.orientation && (window.addEventListener("orientationchange", Ka(this, this.onOrientationChange), !1), this.onOrientationChange(null));
		this.fullscreen = new z(!1);
		u.addVendorListener(window.document, "fullscreenchange", function() {
			b.updateFullscreen()
		}, !1);
		this.updateFullscreen()
	};
	f["flambe.platform.html.HtmlStage"] =
		za;
	za.__name__ = ["flambe", "platform", "html", "HtmlStage"];
	za.__interfaces__ = [Mc];
	za.computeScaleFactor = function() {
		var a = window.devicePixelRatio;
		null == a && (a = 1);
		var b = window.document.createElement("canvas").getContext("2d"),
			b = u.loadExtension("backingStorePixelRatio", b).value;
		null == b && (b = 1);
		a /= b;
		b = window.screen.height;
		return 1136 < a * window.screen.width || 1136 < a * b ? 1 : a
	};
	za.prototype = {
		get_width: function() {
			return this._canvas.width
		},
		get_height: function() {
			return this._canvas.height
		},
		onWindowResize: function() {
			var a =
				this._canvas.parentElement.getBoundingClientRect();
			this.resizeCanvas(a.width, a.height)
		},
		resizeCanvas: function(a, b) {
			var c = this.scaleFactor * a,
				d = this.scaleFactor * b;
			if (this._canvas.width == c && this._canvas.height == d) return !1;
			this._canvas.width = c | 0;
			this._canvas.height = d | 0;
			this.resize.emit();
			return !0
		},
		hideMobileBrowser: function() {
			var a = this,
				b = window.document.documentElement.style;
			b.height = window.innerHeight + 100 + "px";
			b.width = window.innerWidth + "px";
			b.overflow = "visible";
			u.callLater(function() {
				u.hideMobileBrowser();
				u.callLater(function() {
					b.height = window.innerHeight + "px";
					a.onWindowResize(null)
				}, 100)
			})
		},
		onOrientationChange: function() {
			this.orientation.set__(u.orientation(window.orientation))
		},
		updateFullscreen: function() {
			this.fullscreen.set__(!0 == u.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], window.document).value)
		},
		__class__: za
	};
	var Ob = function(a) {
		this._storage = a
	};
	f["flambe.platform.html.HtmlStorage"] = Ob;
	Ob.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
	Ob.__interfaces__ = [bc];
	Ob.prototype = {
		get_supported: function() {
			return !0
		},
		set: function(a, b) {
			var c;
			try {
				var d = new ga;
				d.useCache = !0;
				d.useEnumIndex = !1;
				d.serialize(b);
				c = d.toString()
			} catch (e) {
				return !1
			}
			try {
				this._storage.setItem("flambe:" + a, c)
			} catch (g) {
				return !1
			}
			return !0
		},
		get: function(a, b) {
			var c = null;
			try {
				c = this._storage.getItem("flambe:" + a)
			} catch (d) {
				null
			}
			if (null != c) try {
				return P.run(c)
			} catch (e) {
				null
			}
			return b
		},
		__class__: Ob
	};
	var u = function() {};
	f["flambe.platform.html.HtmlUtil"] = u;
	u.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
	u.callLater = function(a,
		b) {
		null == b && (b = 0);
		window.setTimeout(a, b)
	};
	u.hideMobileBrowser = function() {
		window.scrollTo(1, 0)
	};
	u.loadExtension = function(a, b) {
		null == b && (b = window);
		var c = N.field(b, a);
		if (null != c) return {
			prefix: "",
			field: a,
			value: c
		};
		for (var c = a.charAt(0).toUpperCase() + r.substr(a, 1, null), d = 0, e = u.VENDOR_PREFIXES; d < e.length;) {
			var g = e[d];
			++d;
			var f = g + c,
				i = N.field(b, f);
			if (null != i) return {
				prefix: g,
				field: f,
				value: i
			}
		}
		return {
			prefix: null,
			field: null,
			value: null
		}
	};
	u.loadFirstExtension = function(a, b) {
		for (var c = 0; c < a.length;) {
			var d = a[c];
			++c;
			d = u.loadExtension(d, b);
			if (null != d.field) return d
		}
		return {
			prefix: null,
			field: null,
			value: null
		}
	};
	u.polyfill = function(a, b) {
		null == b && (b = window);
		var c = u.loadExtension(a, b).value;
		if (null == c) return !1;
		b[a] = c;
		return !0
	};
	u.setVendorStyle = function(a, b, c) {
		for (var a = a.style, d = 0, e = u.VENDOR_PREFIXES; d < e.length;) {
			var g = e[d];
			++d;
			a.setProperty("-" + g + "-" + b, c)
		}
		a.setProperty(b, c)
	};
	u.addVendorListener = function(a, b, c, d) {
		for (var e = 0, g = u.VENDOR_PREFIXES; e < g.length;) {
			var f = g[e];
			++e;
			a.addEventListener(f + b, c, d)
		}
		a.addEventListener(b,
			c, d)
	};
	u.orientation = function(a) {
		switch (a) {
			case -90:
			case 90:
				return ja.Landscape;
			default:
				return ja.Portrait
		}
	};
	u.createEmptyCanvas = function(a, b) {
		var c;
		c = window.document.createElement("canvas");
		c.width = a;
		c.height = b;
		return c
	};
	u.createCanvas = function(a) {
		var b = u.createEmptyCanvas(a.width, a.height),
			c = b.getContext("2d");
		c.save();
		c.globalCompositeOperation = "copy";
		c.drawImage(a, 0, 0);
		c.restore();
		return b
	};
	u.fixAndroidMath = function() {
		if (0 <= window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
			var a = Math.sin,
				b = Math.cos;
			Math.sin = function(b) {
				return 0 == b ? 0 : a(b)
			};
			Math.cos = function(a) {
				return 0 == a ? 1 : b(a)
			}
		}
	};
	var w = function(a) {
		this._disposed = !1;
		this.buffer = a
	};
	f["flambe.platform.html.WebAudioSound"] = w;
	w.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
	w.__interfaces__ = [Ga];
	w.get_supported = function() {
		if (w._detectSupport) {
			w._detectSupport = !1;
			var a = u.loadExtension("AudioContext").value;
			null != a && (w.ctx = new a, w.gain = w.createGain(), w.gain.connect(w.ctx.destination), k.volume.watch(function(a) {
				w.gain.gain.value =
					a
			}))
		}
		return null != w.ctx
	};
	w.createGain = function() {
		return null != w.ctx.createGain ? w.ctx.createGain() : w.ctx.createGainNode()
	};
	w.start = function(a, b) {
		null != a.start ? a.start(b) : a.noteOn(b)
	};
	w.__super__ = O;
	w.prototype = q(O.prototype, {
		play: function(a) {
			null == a && (a = 1);
			return new bb(this, a, !1)
		},
		loop: function(a) {
			null == a && (a = 1);
			return new bb(this, a, !0)
		},
		get_duration: function() {
			return this.buffer.duration
		},
		onDisposed: function() {
			this.buffer = null
		},
		__class__: w
	});
	var bb = function(a, b, c) {
		var d = this;
		this._sound = a;
		this._head =
			w.gain;
		this._complete = new z(!1);
		this._sourceNode = w.ctx.createBufferSource();
		this._sourceNode.buffer = a.buffer;
		this._sourceNode.loop = c;
		this._sourceNode.onended = function() {
			d._complete.set__(!0)
		};
		w.start(this._sourceNode, 0);
		this.playAudio();
		this.volume = new y(b, function(a) {
			d.setVolume(a)
		});
		1 != b && this.setVolume(b);
		k.hidden._value && this.set_paused(!0)
	};
	f["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = bb;
	bb.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
	bb.__interfaces__ = [ec, Ha];
	bb.prototype = {
		set_paused: function(a) {
			a != 0 <= this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
			return a
		},
		get_position: function() {
			return this._complete._value ? this._sound.get_duration() : 0 <= this._pausedAt ? this._pausedAt : (w.ctx.currentTime - this._startedAt) % this._sound.get_duration()
		},
		update: function(a) {
			this.volume.update(a);
			3 == this._sourceNode.playbackState && this._complete.set__(!0);
			return this._complete._value || 0 <= this._pausedAt ? (this._tickableAdded = !1, this._hideBinding.dispose(), !0) : !1
		},
		dispose: function() {
			this.set_paused(!0);
			this._complete.set__(!0)
		},
		setVolume: function(a) {
			null == this._gainNode && (this._gainNode = w.createGain(), this.insertNode(this._gainNode));
			this._gainNode.gain.value = a
		},
		insertNode: function(a) {
			0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
			a.connect(this._head);
			this._head = a
		},
		playAudio: function() {
			var a = this;
			this._sourceNode.connect(this._head);
			this._startedAt = w.ctx.currentTime;
			this._pausedAt = -1;
			this._tickableAdded ||
				(da.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._hideBinding = k.hidden.get_changed().connect(function(b) {
					b ? (a._wasPaused = 0 <= a._pausedAt, a.set_paused(!0)) : a.set_paused(a._wasPaused)
				}))
		},
		__class__: bb
	};
	var Kb = function() {
		this._width = this._height = -1;
		this._transitor = null;
		this.scenes = [];
		this.occludedScenes = [];
		this._root = new e
	};
	f["flambe.scene.Director"] = Kb;
	Kb.__name__ = ["flambe", "scene", "Director"];
	Kb.__super__ = n;
	Kb.prototype = q(n.prototype, {
		get_name: function() {
			return "Director_2"
		},
		pushScene: function(a,
			b) {
			var c = this;
			this.completeTransition();
			var d = this.get_topScene();
			null != d ? this.playTransition(d, a, b, function() {
				c.hide(d)
			}) : (this.add(a), this.invalidateVisibility())
		},
		unwindToScene: function(a, b) {
			var c = this;
			this.completeTransition();
			var d = this.get_topScene();
			if (null != d) {
				if (d != a) {
					for (this.scenes.pop(); 0 < this.scenes.length && this.scenes[this.scenes.length - 1] != a;) this.scenes.pop().dispose();
					this.playTransition(d, a, b, function() {
						c.hideAndDispose(d)
					})
				}
			} else this.pushScene(a, b)
		},
		onAdded: function() {
			this.owner.addChild(this._root)
		},
		onRemoved: function() {
			this.completeTransition();
			for (var a = 0, b = this.scenes; a < b.length;) {
				var c = b[a];
				++a;
				c.dispose()
			}
			this.scenes = [];
			this.occludedScenes = [];
			this._root.dispose()
		},
		onUpdate: function(a) {
			null != this._transitor && this._transitor.update(a) && this.completeTransition()
		},
		get_topScene: function() {
			var a = this.scenes.length;
			return 0 < a ? this.scenes[a - 1] : null
		},
		add: function(a) {
			var b = this.get_topScene();
			null != b && this._root.removeChild(b);
			r.remove(this.scenes, a);
			this.scenes.push(a);
			this._root.addChild(a)
		},
		hide: function(a) {
			a =
				a._compMap.Scene_4;
			null != a && a.hidden.emit()
		},
		hideAndDispose: function(a) {
			this.hide(a);
			a.dispose()
		},
		show: function(a) {
			a = a._compMap.Scene_4;
			null != a && a.shown.emit()
		},
		invalidateVisibility: function() {
			for (var a = this.scenes.length; 0 < a;) {
				var b = this.scenes[--a]._compMap.Scene_4;
				if (null == b || b.opaque) break
			}
			this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a, this.scenes.length - 1) : [];
			a = this.get_topScene();
			null != a && this.show(a)
		},
		completeTransition: function() {
			null != this._transitor && (this._transitor.complete(),
				this._transitor = null, this.invalidateVisibility())
		},
		playTransition: function(a, b, c, d) {
			this.completeTransition();
			this.add(b);
			null != c ? (this.occludedScenes.push(a), this._transitor = new Nc(a, b, c, d), this._transitor.init(this)) : (d(), this.invalidateVisibility())
		},
		get_width: function() {
			return 0 > this._width ? k._platform.getStage().get_width() : this._width
		},
		get_height: function() {
			return 0 > this._height ? k._platform.getStage().get_height() : this._height
		},
		__class__: Kb
	});
	var Nc = function(a, b, c, d) {
		this._from = a;
		this._to = b;
		this._transition = c;
		this._onComplete = d
	};
	f["flambe.scene._Director.Transitor"] = Nc;
	Nc.__name__ = ["flambe", "scene", "_Director", "Transitor"];
	Nc.prototype = {
		init: function(a) {
			this._transition.init(a, this._from, this._to)
		},
		update: function(a) {
			return this._transition.update(a)
		},
		complete: function() {
			this._transition.complete();
			this._onComplete()
		},
		__class__: Nc
	};
	var ba = function(a) {
		null == a && (a = !0);
		this.opaque = a;
		this.shown = new T;
		this.hidden = new T
	};
	f["flambe.scene.Scene"] = ba;
	ba.__name__ = ["flambe", "scene", "Scene"];
	ba.__super__ =
		n;
	ba.prototype = q(n.prototype, {
		get_name: function() {
			return "Scene_4"
		},
		__class__: ba
	});
	var cb = function() {};
	f["flambe.scene.Transition"] = cb;
	cb.__name__ = ["flambe", "scene", "Transition"];
	cb.prototype = {
		init: function(a, b, c) {
			this._director = a;
			this._from = b;
			this._to = c
		},
		update: function() {
			return !0
		},
		complete: function() {},
		__class__: cb
	};
	var ka = function(a, b) {
		this._duration = a;
		this._ease = null != b ? b : l.linear
	};
	f["flambe.scene.TweenTransition"] = ka;
	ka.__name__ = ["flambe", "scene", "TweenTransition"];
	ka.__super__ = cb;
	ka.prototype =
		q(cb.prototype, {
			init: function(a, b, c) {
				cb.prototype.init.call(this, a, b, c);
				this._elapsed = 0
			},
			update: function(a) {
				this._elapsed += a;
				return this._elapsed >= this._duration
			},
			interp: function(a, b) {
				return a + (b - a) * this._ease(this._elapsed / this._duration)
			},
			__class__: ka
		});
	var pb = function(a, b) {
		this._direction = 2;
		ka.call(this, a, b)
	};
	f["flambe.scene.SlideTransition"] = pb;
	pb.__name__ = ["flambe", "scene", "SlideTransition"];
	pb.__super__ = ka;
	pb.prototype = q(ka.prototype, {
		init: function(a, b, c) {
			ka.prototype.init.call(this, a, b, c);
			switch (this._direction) {
				case 0:
					this._x = 0;
					this._y = -this._director.get_height();
					break;
				case 1:
					this._x = 0;
					this._y = this._director.get_height();
					break;
				case 2:
					this._x = -this._director.get_width();
					this._y = 0;
					break;
				case 3:
					this._x = this._director.get_width(), this._y = 0
			}
			a = this._from._compMap.Sprite_0;
			null == a && this._from.add(a = new m);
			a.setXY(0, 0);
			a = this._to._compMap.Sprite_0;
			null == a && this._to.add(a = new m);
			a.setXY(-this._x, -this._y)
		},
		update: function(a) {
			a = ka.prototype.update.call(this, a);
			this._from._compMap.Sprite_0.setXY(this.interp(0,
				this._x), this.interp(0, this._y));
			this._to._compMap.Sprite_0.setXY(this.interp(-this._x, 0), this.interp(-this._y, 0));
			return a
		},
		complete: function() {
			this._from._compMap.Sprite_0.setXY(0, 0);
			this._to._compMap.Sprite_0.setXY(0, 0)
		},
		__class__: pb
	});
	var Ia = function() {};
	f["flambe.script.Action"] = Ia;
	Ia.__name__ = ["flambe", "script", "Action"];
	Ia.prototype = {
		__class__: Ia
	};
	var pa = function(a) {
		this._fn = a
	};
	f["flambe.script.CallFunction"] = pa;
	pa.__name__ = ["flambe", "script", "CallFunction"];
	pa.__interfaces__ = [Ia];
	pa.prototype = {
		update: function() {
			this._fn();
			return 0
		},
		__class__: pa
	};
	var oa = function(a) {
		this._duration = a;
		this._elapsed = 0
	};
	f["flambe.script.Delay"] = oa;
	oa.__name__ = ["flambe", "script", "Delay"];
	oa.__interfaces__ = [Ia];
	oa.prototype = {
		update: function(a) {
			this._elapsed += a;
			if (this._elapsed >= this._duration) {
				var b = this._elapsed - this._duration;
				this._elapsed = 0;
				return a - b
			}
			return -1
		},
		__class__: oa
	};
	var ma = function(a, b) {
		null == b && (b = -1);
		this._action = a;
		this._remaining = this._count = b
	};
	f["flambe.script.Repeat"] = ma;
	ma.__name__ = ["flambe",
		"script", "Repeat"
	];
	ma.__interfaces__ = [Ia];
	ma.prototype = {
		update: function(a, b) {
			if (0 == this._count) return 0;
			var c = this._action.update(a, b);
			return 0 < this._count && 0 <= c && 0 == --this._remaining ? (this._remaining = this._count, c) : -1
		},
		__class__: ma
	};
	var la = function() {
		this.stopAll()
	};
	f["flambe.script.Script"] = la;
	la.__name__ = ["flambe", "script", "Script"];
	la.__super__ = n;
	la.prototype = q(n.prototype, {
		get_name: function() {
			return "Script_1"
		},
		run: function(a) {
			a = new hc(a);
			this._handles.push(a);
			return a
		},
		stopAll: function() {
			this._handles = []
		},
		onUpdate: function(a) {
			for (var b = 0; b < this._handles.length;) {
				var c = this._handles[b];
				c.removed || 0 <= c.action.update(a, this.owner) ? this._handles.splice(b, 1) : ++b
			}
		},
		__class__: la
	});
	var hc = function(a) {
		this.removed = !1;
		this.action = a
	};
	f["flambe.script._Script.Handle"] = hc;
	hc.__name__ = ["flambe", "script", "_Script", "Handle"];
	hc.__interfaces__ = [ca];
	hc.prototype = {
		dispose: function() {
			this.removed = !0;
			this.action = null
		},
		__class__: hc
	};
	var na = function(a) {
		this._idx = 0;
		this._runningActions = null != a ? a.slice() : []
	};
	f["flambe.script.Sequence"] =
		na;
	na.__name__ = ["flambe", "script", "Sequence"];
	na.__interfaces__ = [Ia];
	na.prototype = {
		update: function(a, b) {
			for (var c = 0;;) {
				var d = this._runningActions[this._idx];
				if (null != d)
					if (d = d.update(a - c, b), 0 <= d) c += d;
					else return -1;
				++this._idx;
				if (this._idx >= this._runningActions.length) {
					this._idx = 0;
					break
				} else if (c > a) return -1
			}
			return c
		},
		__class__: na
	};
	var aa = f["flambe.subsystem.RendererType"] = {
		__ename__: ["flambe", "subsystem", "RendererType"],
		__constructs__: ["Stage3D", "WebGL", "Canvas"]
	};
	aa.Stage3D = ["Stage3D", 0];
	aa.Stage3D.toString =
		j;
	aa.Stage3D.__enum__ = aa;
	aa.WebGL = ["WebGL", 1];
	aa.WebGL.toString = j;
	aa.WebGL.__enum__ = aa;
	aa.Canvas = ["Canvas", 2];
	aa.Canvas.toString = j;
	aa.Canvas.__enum__ = aa;
	var ic = function() {};
	f["flambe.swf.Symbol"] = ic;
	ic.__name__ = ["flambe", "swf", "Symbol"];
	ic.prototype = {
		__class__: ic
	};
	var jc = function(a, b) {
		this._name = a.symbol;
		var c = a.rect;
		this.texture = b.subTexture(c[0], c[1], c[2], c[3]);
		c = a.origin;
		null != c ? (this.anchorX = c[0], this.anchorY = c[1]) : this.anchorY = this.anchorX = 0
	};
	f["flambe.swf.BitmapSymbol"] = jc;
	jc.__name__ = ["flambe",
		"swf", "BitmapSymbol"
	];
	jc.__interfaces__ = [ic];
	jc.prototype = {
		createSprite: function() {
			var a = new g(this.texture);
			a.setAnchor(this.anchorX, this.anchorY);
			return a
		},
		__class__: jc
	};
	var M = function(a, b) {
		this._file = a.getFile(b + "/library.json");
		var c = JSON.parse(this._file.toString());
		this._symbols = new E;
		this.frameRate = c.frameRate;
		for (var d = [], e = 0, g = c.movies; e < g.length;) {
			var f = g[e];
			++e;
			f = new kc(this, f);
			d.push(f);
			this._symbols.set(f._name, f)
		}
		c = c.textureGroups;
		(1 != c[0].scaleFactor || 1 < c.length) && null;
		c = c[0].atlases;
		for (e = 0; e < c.length;) {
			var i = c[e];
			++e;
			g = a.getTexture(b + "/" + F.removeFileExtension(i.file));
			f = 0;
			for (i = i.textures; f < i.length;) {
				var j = i[f];
				++f;
				j = new jc(j, g);
				this._symbols.set(j._name, j)
			}
		}
		for (c = 0; c < d.length;) {
			g = d[c];
			++c;
			e = 0;
			for (g = g.layers; e < g.length;) {
				f = g[e];
				++e;
				f = f.keyframes;
				i = f.length;
				for (j = 0; j < i;) {
					var k = j++,
						l = f[k];
					if (null != l.symbolName) {
						var m = this._symbols.get(l.symbolName);
						l.symbol = m
					}
					if (l.tweened && 1 == l.duration && k + 1 < i && (k = f[k + 1], !k.visible || null == k.symbolName)) l.visible = !1
				}
			}
		}
	};
	f["flambe.swf.Library"] =
		M;
	M.__name__ = ["flambe", "swf", "Library"];
	M.prototype = {
		createSprite: function(a, b) {
			null == b && (b = !0);
			var c = this._symbols.get(a);
			if (null == c) {
				if (b) throw F.withFields("Missing symbol", ["name", a]);
				return null
			}
			return c.createSprite()
		},
		__class__: M
	};
	var J = function(a) {
		this._oneshotSprite = this._loopingSprite = null;
		this._lib = a;
		this._root = new e;
		this.movie = new z(null);
		this.setCache(!0)
	};
	f["flambe.swf.MoviePlayer"] = J;
	J.__name__ = ["flambe", "swf", "MoviePlayer"];
	J.__super__ = n;
	J.prototype = q(n.prototype, {
		get_name: function() {
			return "MoviePlayer_30"
		},
		setCache: function(a) {
			this._cache = a ? new E : null;
			return this
		},
		loop: function(a, b) {
			null == b && (b = !0);
			if (b || null == this._loopingSprite || this._loopingSprite.symbol._name != a) this._oneshotSprite = null, this._loopingSprite = this.playFromCache(a);
			return this
		},
		onAdded: function() {
			this.owner.addChild(this._root)
		},
		onRemoved: function() {
			this._root.dispose();
			this._oneshotSprite = this._loopingSprite = null;
			this.movie.set__(null)
		},
		onUpdate: function(a) {
			null != this._oneshotSprite && this._oneshotSprite._position + a > this._oneshotSprite.symbol.duration &&
				(this._oneshotSprite = null, this.setCurrent(this._loopingSprite))
		},
		playFromCache: function(a) {
			var b;
			null != this._cache ? (b = this._cache.get(a), null != b ? b.set_position(0) : (b = this.createMovie(a), this._cache.set(a, b))) : b = this.createMovie(a);
			return this.setCurrent(b)
		},
		createMovie: function(a) {
			a = this._lib.createSprite(a, !0);
			null != this._decorator && this._decorator(a);
			return a
		},
		setCurrent: function(a) {
			this._root.add(a);
			return this.movie.set__(a)
		},
		__class__: J
	});
	var db = function(a) {
		this._looped = null;
		m.call(this);
		this.symbol =
			a;
		this.speed = new y(1);
		this._animators = Array(a.layers.length);
		for (var b = 0, c = this._animators.length; b < c;) {
			var d = b++;
			this._animators[d] = new Oc(a.layers[d])
		}
		this._position = this._frame = 0;
		this.goto(1)
	};
	f["flambe.swf.MovieSprite"] = db;
	db.__name__ = ["flambe", "swf", "MovieSprite"];
	db.__super__ = m;
	db.prototype = q(m.prototype, {
		onAdded: function() {
			m.prototype.onAdded.call(this);
			for (var a = 0, b = this._animators; a < b.length;) {
				var c = b[a];
				++a;
				this.owner.addChild(c.content)
			}
		},
		onRemoved: function() {
			m.prototype.onRemoved.call(this);
			for (var a = 0, b = this._animators; a < b.length;) {
				var c = b[a];
				++a;
				this.owner.removeChild(c.content)
			}
		},
		onUpdate: function(a) {
			m.prototype.onUpdate.call(this, a);
			this.speed.update(a);
			switch (this._flags & 384) {
				case 0:
					this._position += this.speed._value * a;
					this._position > this.symbol.duration && (this._position %= this.symbol.duration, null != this._looped && this._looped.emit());
					break;
				case 256:
					this._flags &= -257
			}
			this.goto(this._position * this.symbol.frameRate)
		},
		"goto": function(a) {
			if (this._frame != a) {
				if (a < this._frame)
					for (var b = 0,
							c = this._animators; b < c.length;) {
						var d = c[b];
						++b;
						d.needsKeyframeUpdate = !0;
						d.keyframeIdx = 0
					}
				b = 0;
				for (c = this._animators; b < c.length;) d = c[b], ++b, d.composeFrame(a);
				this._frame = a
			}
		},
		set_position: function(a) {
			return this._position = Fa.clamp(a, 0, this.symbol.duration)
		},
		rewind: function() {
			this._position = 0;
			this._flags |= 256
		},
		__class__: db
	});
	var Oc = function(a) {
		this.keyframeIdx = 0;
		this.needsKeyframeUpdate = !1;
		this.layer = a;
		this.content = new e;
		if (a.empty) this._sprites = null;
		else {
			this._sprites = Array(a.keyframes.length);
			for (var b =
					0, c = this._sprites.length; b < c;) {
				var d = b++,
					g = a.keyframes[d];
				this._sprites[d] = 0 < d && a.keyframes[d - 1].symbol == g.symbol ? this._sprites[d - 1] : null == g.symbol ? new m : g.symbol.createSprite()
			}
			this.content.add(this._sprites[0])
		}
	};
	f["flambe.swf._MovieSprite.LayerAnimator"] = Oc;
	Oc.__name__ = ["flambe", "swf", "_MovieSprite", "LayerAnimator"];
	Oc.prototype = {
		composeFrame: function(a) {
			if (null != this._sprites) {
				var b = this.layer.keyframes,
					c = b.length - 1;
				if (a > this.layer.frames) this.content._compMap.Sprite_0.set_visible(!1), this.keyframeIdx =
					c, this.needsKeyframeUpdate = !0;
				else {
					for (; this.keyframeIdx < c && b[this.keyframeIdx + 1].index <= a;) ++this.keyframeIdx, this.needsKeyframeUpdate = !0;
					var d;
					this.needsKeyframeUpdate ? (this.needsKeyframeUpdate = !1, d = this._sprites[this.keyframeIdx], d != this.content._compMap.Sprite_0 && (B.getClass(d) == db && d.rewind(), this.content.add(d))) : d = this.content._compMap.Sprite_0;
					var e = b[this.keyframeIdx],
						g = e.visible && null != e.symbol;
					d.set_visible(g);
					if (g) {
						var g = e.x,
							f = e.y,
							i = e.scaleX,
							j = e.scaleY,
							k = e.skewX,
							l = e.skewY,
							m = e.alpha;
						if (e.tweened &&
							this.keyframeIdx < c) {
							a = (a - e.index) / e.duration;
							c = e.ease;
							if (0 != c) {
								var n;
								0 > c ? (n = 1 - a, n = 1 - n * n, c = -c) : n = a * a;
								a = c * n + (1 - c) * a
							}
							b = b[this.keyframeIdx + 1];
							g += (b.x - g) * a;
							f += (b.y - f) * a;
							i += (b.scaleX - i) * a;
							j += (b.scaleY - j) * a;
							k += (b.skewX - k) * a;
							l += (b.skewY - l) * a;
							m += (b.alpha - m) * a
						}
						b = d.getLocalMatrix();
						a = Math.sin(k);
						k = Math.cos(k);
						c = Math.sin(l);
						l = Math.cos(l);
						b.set(l * i, c * i, -a * j, k * j, g, f);
						b.translate(-e.pivotX, -e.pivotY);
						d.alpha.set__(m)
					}
				}
			}
		},
		__class__: Oc
	};
	var kc = function(a, b) {
		this._name = b.id;
		this.frameRate = a.frameRate;
		this.frames = 0;
		this.layers = Array(b.layers.length);
		for (var c = 0, d = this.layers.length; c < d;) {
			var e = c++,
				g = new Pc(b.layers[e]);
			this.frames = Math.max(g.frames, this.frames);
			this.layers[e] = g
		}
		this.duration = this.frames / this.frameRate
	};
	f["flambe.swf.MovieSymbol"] = kc;
	kc.__name__ = ["flambe", "swf", "MovieSymbol"];
	kc.__interfaces__ = [ic];
	kc.prototype = {
		createSprite: function() {
			return new db(this)
		},
		__class__: kc
	};
	var Pc = function(a) {
		this.empty = !0;
		this.name = a.name;
		var b = null;
		this.keyframes = Array(a.keyframes.length);
		for (var c = 0, d = this.keyframes.length; c <
			d;) {
			var e = c++,
				b = new Qc(a.keyframes[e], b);
			this.keyframes[e] = b;
			this.empty = this.empty && null == b.symbolName
		}
		this.frames = null != b ? b.index + b.duration : 0
	};
	f["flambe.swf.MovieLayer"] = Pc;
	Pc.__name__ = ["flambe", "swf", "MovieLayer"];
	Pc.prototype = {
		__class__: Pc
	};
	var Qc = function(a, b) {
		this.ease = 0;
		this.visible = this.tweened = !0;
		this.alpha = 1;
		this.skewX = this.skewY = this.pivotX = this.pivotY = 0;
		this.scaleX = this.scaleY = 1;
		this.x = this.y = 0;
		this.symbol = null;
		this.index = null != b ? b.index + b.duration : 0;
		this.duration = a.duration;
		this.label =
			a.label;
		this.symbolName = a.ref;
		var c = a.loc;
		null != c && (this.x = c[0], this.y = c[1]);
		c = a.scale;
		null != c && (this.scaleX = c[0], this.scaleY = c[1]);
		c = a.skew;
		null != c && (this.skewX = c[0], this.skewY = c[1]);
		c = a.pivot;
		null != c && (this.pivotX = c[0], this.pivotY = c[1]);
		null != a.alpha && (this.alpha = a.alpha);
		null != a.visible && (this.visible = a.visible);
		null != a.tweened && (this.tweened = a.tweened);
		null != a.ease && (this.ease = a.ease)
	};
	f["flambe.swf.MovieKeyframe"] = Qc;
	Qc.__name__ = ["flambe", "swf", "MovieKeyframe"];
	Qc.prototype = {
		__class__: Qc
	};
	var ld =
		function() {};
	f["flambe.util.Assert"] = ld;
	ld.__name__ = ["flambe", "util", "Assert"];
	ld.that = function() {};
	var xc = function() {};
	f["flambe.util.BitSets"] = xc;
	xc.__name__ = ["flambe", "util", "BitSets"];
	xc.set = function(a, b, c) {
		return c ? a | b : a & ~b
	};
	var eb = function() {
		this.mainSection = new E;
		this.sections = new E
	};
	f["flambe.util.Config"] = eb;
	eb.__name__ = ["flambe", "util", "Config"];
	eb.parse = function(a) {
		for (var b = new eb, c = new W("^\\s*;", ""), d = new W("^\\s*\\[\\s*([^\\]]*)\\s*\\]", ""), e = new W("^\\s*([\\w\\.\\-_]+)\\s*=\\s*(.*)",
				""), g = b.mainSection, f = 0, a = (new W("\r\n|\r|\n", "g")).split(a); f < a.length;) {
			var i = a[f];
			++f;
			if (!c.match(i))
				if (d.match(i)) i = d.matched(1), b.sections.exists(i) ? g = b.sections.get(i) : (g = new E, b.sections.set(i, g));
				else if (e.match(i)) {
				var i = e.matched(1),
					j = e.matched(2),
					k = j.charCodeAt(0);
				if ((34 == k || 39 == k) && j.charCodeAt(j.length - 1) == k) j = r.substr(j, 1, j.length - 2);
				j = C.replace(C.replace(C.replace(C.replace(C.replace(C.replace(j, "\\n", "\n"), "\\r", "\r"), "\\t", "\t"), "\\'", "'"), '\\"', '"'), "\\\\", "\\");
				g.set(i, j)
			}
		}
		return b
	};
	eb.prototype = {
		get: function(a) {
			var b = a.indexOf(".");
			if (0 > b) return this.mainSection.get(a);
			var c;
			c = this.sections.get(r.substr(a, 0, b));
			return null != c ? (a = r.substr(a, b + 1, null), c.get(a)) : null
		},
		__class__: eb
	};
	var Na = function(a) {
		this.config = a;
		this.missingTranslation = new x
	};
	f["flambe.util.MessageBundle"] = Na;
	Na.__name__ = ["flambe", "util", "MessageBundle"];
	Na.parse = function(a) {
		return new Na(eb.parse(a))
	};
	Na.prototype = {
		get: function(a, b) {
			var c = this.config.get(a);
			return null == c ? (this.missingTranslation.emit(a), a) :
				null != b ? F.substitute(c, b) : c
		},
		__class__: Na
	};
	var Zb = function() {
		this.success = new x;
		this.error = new x;
		this.progressChanged = new T;
		this.hasResult = !1;
		this._total = this._progress = 0
	};
	f["flambe.util.Promise"] = Zb;
	Zb.__name__ = ["flambe", "util", "Promise"];
	Zb.prototype = {
		set_result: function(a) {
			if (this.hasResult) throw "Promise result already assigned";
			this._result = a;
			this.hasResult = !0;
			this.success.emit(a);
			return a
		},
		get: function(a) {
			return this.hasResult ? (a(this._result), null) : this.success.connect(a).once()
		},
		set_progress: function(a) {
			this._progress !=
				a && (this._progress = a, this.progressChanged.emit());
			return a
		},
		set_total: function(a) {
			this._total != a && (this._total = a, this.progressChanged.emit());
			return a
		},
		__class__: Zb
	};
	var T = function(a) {
		G.call(this, a)
	};
	f["flambe.util.Signal0"] = T;
	T.__name__ = ["flambe", "util", "Signal0"];
	T.__super__ = G;
	T.prototype = q(G.prototype, {
		emit: function() {
			var a = this;
			this._head == G.DISPATCHING_SENTINEL ? this.defer(function() {
				a.emitImpl()
			}) : this.emitImpl()
		},
		emitImpl: function() {
			for (var a = this.willEmit(), b = a; null != b;) b._listener(), b.stayInList ||
				b.dispose(), b = b._next;
			this.didEmit(a)
		},
		__class__: T
	});
	var tc = function(a) {
		this.next = null;
		this.fn = a
	};
	f["flambe.util._SignalBase.Task"] = tc;
	tc.__name__ = ["flambe", "util", "_SignalBase", "Task"];
	tc.prototype = {
		__class__: tc
	};
	var F = function() {};
	f["flambe.util.Strings"] = F;
	F.__name__ = ["flambe", "util", "Strings"];
	F.getFileExtension = function(a) {
		var b = a.lastIndexOf(".");
		return 0 < b ? r.substr(a, b + 1, null) : null
	};
	F.removeFileExtension = function(a) {
		var b = a.lastIndexOf(".");
		return 0 < b ? r.substr(a, 0, b) : a
	};
	F.getUrlExtension = function(a) {
		var b =
			a.lastIndexOf("?");
		0 <= b && (a = r.substr(a, 0, b));
		b = a.lastIndexOf("/");
		0 <= b && (a = r.substr(a, b + 1, null));
		return F.getFileExtension(a)
	};
	F.joinPath = function(a, b) {
		0 < a.length && 47 != a.charCodeAt(a.length - 1) && (a += "/");
		return a + b
	};
	F.substitute = function(a, b) {
		for (var c = 0, d = b.length; c < d;) var e = c++,
			a = C.replace(a, "{" + e + "}", b[e]);
		return a
	};
	F.withFields = function(a, b) {
		var c = b.length;
		if (0 < c) {
			for (var a = 0 < a.length ? a + " [" : a + "[", d = 0; d < c;) {
				0 < d && (a += ", ");
				var e = b[d],
					g = b[d + 1];
				if (i.is(g, Error)) {
					var f = g.stack;
					null != f && (g = f)
				}
				a += e +
					"=" + i.string(g);
				d += 2
			}
			a += "]"
		}
		return a
	};
	var ga = function() {
		this.buf = new ya;
		this.cache = [];
		this.useCache = ga.USE_CACHE;
		this.useEnumIndex = ga.USE_ENUM_INDEX;
		this.shash = new E;
		this.scount = 0
	};
	f["haxe.Serializer"] = ga;
	ga.__name__ = ["haxe", "Serializer"];
	ga.prototype = {
		toString: function() {
			return this.buf.b
		},
		serializeString: function(a) {
			var b = this.shash.get(a);
			null != b ? (this.buf.b += "R", this.buf.b += "" + b) : (this.shash.set(a, this.scount++), this.buf.b += "y", a = encodeURIComponent(a), this.buf.b += "" + a.length, this.buf.b += ":", this.buf.b +=
				a)
		},
		serializeRef: function(a) {
			for (var b = typeof a, c = 0, d = this.cache.length; c < d;) {
				var e = c++,
					g = this.cache[e];
				if (typeof g == b && g == a) return this.buf.b += "r", this.buf.b += "" + e, !0
			}
			this.cache.push(a);
			return !1
		},
		serializeFields: function(a) {
			for (var b = 0, c = N.fields(a); b < c.length;) {
				var d = c[b];
				++b;
				this.serializeString(d);
				this.serialize(N.field(a, d))
			}
			this.buf.b += "g"
		},
		serialize: function(a) {
			var b = B["typeof"](a);
			switch (b[1]) {
				case 0:
					this.buf.b += "n";
					break;
				case 1:
					if (0 == a) {
						this.buf.b += "z";
						break
					}
					this.buf.b += "i";
					this.buf.b += "" +
						a;
					break;
				case 2:
					Math.isNaN(a) ? this.buf.b += "k" : Math.isFinite(a) ? (this.buf.b += "d", this.buf.b += "" + a) : this.buf.b = 0 > a ? this.buf.b + "m" : this.buf.b + "p";
					break;
				case 3:
					this.buf.b = a ? this.buf.b + "t" : this.buf.b + "f";
					break;
				case 6:
					b = b[2];
					if (b == String) {
						this.serializeString(a);
						break
					}
					if (this.useCache && this.serializeRef(a)) break;
					switch (b) {
						case Array:
							b = 0;
							this.buf.b += "a";
							for (var c = a.length, d = 0; d < c;) {
								var e = d++;
								null == a[e] ? b++ : (0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b += "" + b), b = 0), this.serialize(a[e]))
							}
							0 < b && (1 ==
								b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b += "" + b));
							this.buf.b += "h";
							break;
						case Ta:
							this.buf.b += "l";
							for (a = a.iterator(); a.hasNext();) this.serialize(a.next());
							this.buf.b += "h";
							break;
						case Date:
							this.buf.b += "v";
							this.buf.add(r.dateStr(a));
							break;
						case E:
							this.buf.b += "b";
							for (b = a.keys(); b.hasNext();) c = b.next(), this.serializeString(c), this.serialize(a.get(c));
							this.buf.b += "h";
							break;
						case X:
							this.buf.b += "q";
							for (b = a.keys(); b.hasNext();) c = b.next(), this.buf.b += ":", this.buf.b += "" + c, this.serialize(a.get(c));
							this.buf.b +=
								"h";
							break;
						case va:
							this.buf.b += "M";
							for (b = a.keys(); b.hasNext();) c = b.next(), d = N.field(c, "__id__"), N.deleteField(c, "__id__"), this.serialize(c), c.__id__ = d, this.serialize(a.h[c.__id__]);
							this.buf.b += "h";
							break;
						case Ja:
							d = 0;
							e = a.length - 2;
							b = new ya;
							for (c = ga.BASE64; d < e;) {
								var g = a.get(d++),
									f = a.get(d++),
									j = a.get(d++);
								b.add(c.charAt(g >> 2));
								b.add(c.charAt((g << 4 | f >> 4) & 63));
								b.add(c.charAt((f << 2 | j >> 6) & 63));
								b.add(c.charAt(j & 63))
							}
							d == e ? (e = a.get(d++), a = a.get(d++), b.add(c.charAt(e >> 2)), b.add(c.charAt((e << 4 | a >> 4) & 63)), b.add(c.charAt(a <<
								2 & 63))) : d == e + 1 && (a = a.get(d++), b.add(c.charAt(a >> 2)), b.add(c.charAt(a << 4 & 63)));
							a = b.b;
							this.buf.b += "s";
							this.buf.b += "" + a.length;
							this.buf.b += ":";
							this.buf.b += a;
							break;
						default:
							this.useCache && this.cache.pop(), null != a.hxSerialize ? (this.buf.b += "C", this.serializeString(B.getClassName(b)), this.useCache && this.cache.push(a), a.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(B.getClassName(b)), this.useCache && this.cache.push(a), this.serializeFields(a))
					}
					break;
				case 4:
					if (this.useCache && this.serializeRef(a)) break;
					this.buf.b += "o";
					this.serializeFields(a);
					break;
				case 7:
					b = b[2];
					if (this.useCache) {
						if (this.serializeRef(a)) break;
						this.cache.pop()
					}
					this.buf.b = this.useEnumIndex ? this.buf.b + "j" : this.buf.b + "w";
					this.serializeString(B.getEnumName(b));
					this.useEnumIndex ? (this.buf.b += ":", this.buf.b += i.string(a[1])) : this.serializeString(a[0]);
					this.buf.b += ":";
					b = a.length;
					this.buf.b += "" + (b - 2);
					for (c = 2; c < b;) d = c++, this.serialize(a[d]);
					this.useCache && this.cache.push(a);
					break;
				case 5:
					throw "Cannot serialize function";
				default:
					throw "Cannot serialize " +
						i.string(a);
			}
		},
		__class__: ga
	};
	var P = function(a) {
		this.buf = a;
		this.length = a.length;
		this.pos = 0;
		this.scache = [];
		this.cache = [];
		a = P.DEFAULT_RESOLVER;
		null == a && (a = B, P.DEFAULT_RESOLVER = a);
		this.setResolver(a)
	};
	f["haxe.Unserializer"] = P;
	P.__name__ = ["haxe", "Unserializer"];
	P.initCodes = function() {
		for (var a = [], b = 0, c = P.BASE64.length; b < c;) {
			var d = b++;
			a[P.BASE64.charCodeAt(d)] = d
		}
		return a
	};
	P.run = function(a) {
		return (new P(a)).unserialize()
	};
	P.prototype = {
		setResolver: function(a) {
			this.resolver = null == a ? {
				resolveClass: function() {
					return null
				},
				resolveEnum: function() {
					return null
				}
			} : a
		},
		get: function(a) {
			return this.buf.charCodeAt(a)
		},
		readDigits: function() {
			for (var a = 0, b = !1, c = this.pos;;) {
				var d = this.buf.charCodeAt(this.pos);
				if (d != d) break;
				if (45 == d) {
					if (this.pos != c) break;
					b = !0
				} else {
					if (48 > d || 57 < d) break;
					a = 10 * a + (d - 48)
				}
				this.pos++
			}
			b && (a *= -1);
			return a
		},
		unserializeObject: function(a) {
			for (;;) {
				if (this.pos >= this.length) throw "Invalid object";
				if (103 == this.buf.charCodeAt(this.pos)) break;
				var b = this.unserialize();
				if ("string" != typeof b) throw "Invalid object key";
				var c =
					this.unserialize();
				a[b] = c
			}
			this.pos++
		},
		unserializeEnum: function(a, b) {
			if (58 != this.get(this.pos++)) throw "Invalid enum format";
			var c = this.readDigits();
			if (0 == c) return B.createEnum(a, b);
			for (var d = []; 0 < c--;) d.push(this.unserialize());
			return B.createEnum(a, b, d)
		},
		unserialize: function() {
			switch (this.get(this.pos++)) {
				case 110:
					return null;
				case 116:
					return !0;
				case 102:
					return !1;
				case 122:
					return 0;
				case 105:
					return this.readDigits();
				case 100:
					for (var a = this.pos;;) {
						var b = this.buf.charCodeAt(this.pos);
						if (43 <= b && 58 > b || 101 ==
							b || 69 == b) this.pos++;
						else break
					}
					return i.parseFloat(r.substr(this.buf, a, this.pos - a));
				case 121:
					a = this.readDigits();
					if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid string length";
					b = r.substr(this.buf, this.pos, a);
					this.pos += a;
					b = decodeURIComponent(b.split("+").join(" "));
					this.scache.push(b);
					return b;
				case 107:
					return Math.NaN;
				case 109:
					return Math.NEGATIVE_INFINITY;
				case 112:
					return Math.POSITIVE_INFINITY;
				case 97:
					a = [];
					for (this.cache.push(a);;) {
						b = this.buf.charCodeAt(this.pos);
						if (104 == b) {
							this.pos++;
							break
						}
						117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
					}
					return a;
				case 111:
					return a = {}, this.cache.push(a), this.unserializeObject(a), a;
				case 114:
					a = this.readDigits();
					if (0 > a || a >= this.cache.length) throw "Invalid reference";
					return this.cache[a];
				case 82:
					a = this.readDigits();
					if (0 > a || a >= this.scache.length) throw "Invalid string reference";
					return this.scache[a];
				case 120:
					throw this.unserialize();
				case 99:
					a = this.unserialize();
					b = this.resolver.resolveClass(a);
					if (null == b) throw "Class not found " +
						a;
					a = B.createEmptyInstance(b);
					this.cache.push(a);
					this.unserializeObject(a);
					return a;
				case 119:
					a = this.unserialize();
					b = this.resolver.resolveEnum(a);
					if (null == b) throw "Enum not found " + a;
					a = this.unserializeEnum(b, this.unserialize());
					this.cache.push(a);
					return a;
				case 106:
					a = this.unserialize();
					b = this.resolver.resolveEnum(a);
					if (null == b) throw "Enum not found " + a;
					this.pos++;
					var c = this.readDigits(),
						d = B.getEnumConstructs(b)[c];
					if (null == d) throw "Unknown enum index " + a + "@" + c;
					a = this.unserializeEnum(b, d);
					this.cache.push(a);
					return a;
				case 108:
					a = new Ta;
					for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) a.add(this.unserialize());
					this.pos++;
					return a;
				case 98:
					a = new E;
					for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
					this.pos++;
					return a;
				case 113:
					a = new X;
					this.cache.push(a);
					for (b = this.get(this.pos++); 58 == b;) b = this.readDigits(), a.set(b, this.unserialize()), b = this.get(this.pos++);
					if (104 != b) throw "Invalid IntMap format";
					return a;
				case 77:
					a = new va;
					for (this.cache.push(a); 104 !=
						this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
					this.pos++;
					return a;
				case 118:
					return a = r.substr(this.buf, this.pos, 19), a = r.strDate(a), this.cache.push(a), this.pos += 19, a;
				case 115:
					a = this.readDigits();
					d = this.buf;
					if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid bytes length";
					var e = P.CODES;
					null == e && (e = P.initCodes(), P.CODES = e);
					for (var g = this.pos, f = a & 3, j = g + (a - f), b = Ja.alloc(3 * (a >> 2) + (2 <= f ? f - 1 : 0)), c = 0; g < j;) {
						var k = e[C.fastCodeAt(d, g++)],
							l = e[C.fastCodeAt(d, g++)];
						b.set(c++, k << 2 | l >> 4);
						k = e[C.fastCodeAt(d, g++)];
						b.set(c++, l << 4 | k >> 2);
						l = e[C.fastCodeAt(d, g++)];
						b.set(c++, k << 6 | l)
					}
					2 <= f && (l = e[C.fastCodeAt(d, g++)], j = e[C.fastCodeAt(d, g++)], b.set(c++, l << 2 | j >> 4), 3 == f && (d = e[C.fastCodeAt(d, g++)], b.set(c++, j << 4 | d >> 2)));
					this.pos += a;
					this.cache.push(b);
					return b;
				case 67:
					a = this.unserialize();
					b = this.resolver.resolveClass(a);
					if (null == b) throw "Class not found " + a;
					a = B.createEmptyInstance(b);
					this.cache.push(a);
					a.hxUnserialize(this);
					if (103 != this.get(this.pos++)) throw "Invalid custom data";
					return a
			}
			this.pos--;
			throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
		},
		__class__: P
	};
	var X = function() {
		this.h = {}
	};
	f["haxe.ds.IntMap"] = X;
	X.__name__ = ["haxe", "ds", "IntMap"];
	X.__interfaces__ = [qc];
	X.prototype = {
		set: function(a, b) {
			this.h[a] = b
		},
		get: function(a) {
			return this.h[a]
		},
		exists: function(a) {
			return this.h.hasOwnProperty(a)
		},
		remove: function(a) {
			if (!this.h.hasOwnProperty(a)) return !1;
			delete this.h[a];
			return !0
		},
		keys: function() {
			var a = [],
				b;
			for (b in this.h) this.h.hasOwnProperty(b) && a.push(b |
				0);
			return r.iter(a)
		},
		__class__: X
	};
	var va = function() {
		this.h = {};
		this.h.__keys__ = {}
	};
	f["haxe.ds.ObjectMap"] = va;
	va.__name__ = ["haxe", "ds", "ObjectMap"];
	va.__interfaces__ = [qc];
	va.prototype = {
		set: function(a, b) {
			var c = a.__id__ || (a.__id__ = ++va.count);
			this.h[c] = b;
			this.h.__keys__[c] = a
		},
		keys: function() {
			var a = [],
				b;
			for (b in this.h.__keys__) this.h.hasOwnProperty(b) && a.push(this.h.__keys__[b]);
			return r.iter(a)
		},
		__class__: va
	};
	var E = function() {
		this.h = {}
	};
	f["haxe.ds.StringMap"] = E;
	E.__name__ = ["haxe", "ds", "StringMap"];
	E.__interfaces__ = [qc];
	E.prototype = {
		set: function(a, b) {
			this.h["$" + a] = b
		},
		get: function(a) {
			return this.h["$" + a]
		},
		exists: function(a) {
			return this.h.hasOwnProperty("$" + a)
		},
		keys: function() {
			var a = [],
				b;
			for (b in this.h) this.h.hasOwnProperty(b) && a.push(b.substr(1));
			return r.iter(a)
		},
		iterator: function() {
			return {
				ref: this.h,
				it: this.keys(),
				hasNext: function() {
					return this.it.hasNext()
				},
				next: function() {
					return this.ref["$" + this.it.next()]
				}
			}
		},
		__class__: E
	};
	var Ja = function(a, b) {
		this.length = a;
		this.b = b
	};
	f["haxe.io.Bytes"] = Ja;
	Ja.__name__ = ["haxe",
		"io", "Bytes"
	];
	Ja.alloc = function(a) {
		for (var b = [], c = 0; c < a;) c++, b.push(0);
		return new Ja(a, b)
	};
	Ja.prototype = {
		get: function(a) {
			return this.b[a]
		},
		set: function(a, b) {
			this.b[a] = b & 255
		},
		__class__: Ja
	};
	var kd = function() {};
	f["haxe.rtti.Meta"] = kd;
	kd.__name__ = ["haxe", "rtti", "Meta"];
	kd.getType = function(a) {
		a = a.__meta__;
		return null == a || null == a.obj ? {} : a.obj
	};
	var Rc = function(a) {
		this.__x = a
	};
	f["haxe.xml._Fast.NodeAccess"] = Rc;
	Rc.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
	Rc.prototype = {
		resolve: function(a) {
			var b = this.__x.elementsNamed(a).next();
			if (null == b) throw (this.__x.nodeType == p.Document ? "Document" : this.__x.get_nodeName()) + " is missing element " + a;
			return new Pa(b)
		},
		__class__: Rc
	};
	var Sc = function(a) {
		this.__x = a
	};
	f["haxe.xml._Fast.AttribAccess"] = Sc;
	Sc.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
	Sc.prototype = {
		resolve: function(a) {
			if (this.__x.nodeType == p.Document) throw "Cannot access document attribute " + a;
			var b = this.__x.get(a);
			if (null == b) throw this.__x.get_nodeName() + " is missing attribute " + a;
			return b
		},
		__class__: Sc
	};
	var Tc = function(a) {
		this.__x =
			a
	};
	f["haxe.xml._Fast.HasAttribAccess"] = Tc;
	Tc.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
	Tc.prototype = {
		__class__: Tc
	};
	var Uc = function(a) {
		this.__x = a
	};
	f["haxe.xml._Fast.HasNodeAccess"] = Uc;
	Uc.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
	Uc.prototype = {
		__class__: Uc
	};
	var Vc = function(a) {
		this.__x = a
	};
	f["haxe.xml._Fast.NodeListAccess"] = Vc;
	Vc.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
	Vc.prototype = {
		resolve: function(a) {
			for (var b = new Ta, a = this.__x.elementsNamed(a); a.hasNext();) {
				var c = a.next();
				b.add(new Pa(c))
			}
			return b
		},
		__class__: Vc
	};
	var Pa = function(a) {
		if (a.nodeType != p.Document && a.nodeType != p.Element) throw "Invalid nodeType " + i.string(a.nodeType);
		this.x = a;
		this.node = new Rc(a);
		this.nodes = new Vc(a);
		this.att = new Sc(a);
		this.has = new Tc(a);
		this.hasNode = new Uc(a)
	};
	f["haxe.xml.Fast"] = Pa;
	Pa.__name__ = ["haxe", "xml", "Fast"];
	Pa.prototype = {
		__class__: Pa
	};
	var ia = function() {};
	f["haxe.xml.Parser"] = ia;
	ia.__name__ = ["haxe", "xml", "Parser"];
	ia.parse = function(a) {
		var b = p.createDocument();
		ia.doParse(a, 0, b);
		return b
	};
	ia.doParse = function(a, b,
		c) {
		null == b && (b = 0);
		for (var d = null, e = 1, g = 1, f = null, j = 0, k = 0, l = 0, m = a.charCodeAt(b), n = new ya; m == m;) {
			switch (e) {
				case 0:
					switch (m) {
						case 10:
						case 13:
						case 9:
						case 32:
							break;
						default:
							e = g;
							continue
					}
					break;
				case 1:
					switch (m) {
						case 60:
							e = 0;
							g = 2;
							break;
						default:
							j = b;
							e = 13;
							continue
					}
					break;
				case 13:
					60 == m ? (g = p.createPCData(n.b + r.substr(a, j, b - j)), n = new ya, c.addChild(g), k++, e = 0, g = 2) : 38 == m && (n.addSub(a, j, b - j), e = 18, g = 13, j = b + 1);
					break;
				case 17:
					93 == m && 93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (e = p.createCData(r.substr(a, j, b - j)), c.addChild(e),
						k++, b += 2, e = 1);
					break;
				case 2:
					switch (m) {
						case 33:
							if (91 == a.charCodeAt(b + 1)) {
								b += 2;
								if ("CDATA[" != r.substr(a, b, 6).toUpperCase()) throw "Expected <![CDATA[";
								b += 5;
								e = 17
							} else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
								if ("OCTYPE" != r.substr(a, b + 2, 6).toUpperCase()) throw "Expected <!DOCTYPE";
								b += 8;
								e = 16
							} else {
								if (45 != a.charCodeAt(b + 1) || 45 != a.charCodeAt(b + 2)) throw "Expected <\!--";
								b += 2;
								e = 15
							}
							j = b + 1;
							break;
						case 63:
							e = 14;
							j = b;
							break;
						case 47:
							if (null == c) throw "Expected node name";
							j = b + 1;
							e = 0;
							g = 10;
							break;
						default:
							e = 3;
							j = b;
							continue
					}
					break;
				case 3:
					if (!(97 <= m && 122 >= m || 65 <= m && 90 >= m || 48 <= m && 57 >= m || 58 == m || 46 == m || 95 == m || 45 == m)) {
						if (b == j) throw "Expected node name";
						d = p.createElement(r.substr(a, j, b - j));
						c.addChild(d);
						e = 0;
						g = 4;
						continue
					}
					break;
				case 4:
					switch (m) {
						case 47:
							e = 11;
							k++;
							break;
						case 62:
							e = 9;
							k++;
							break;
						default:
							e = 5;
							j = b;
							continue
					}
					break;
				case 5:
					if (!(97 <= m && 122 >= m || 65 <= m && 90 >= m || 48 <= m && 57 >= m || 58 == m || 46 == m || 95 == m || 45 == m)) {
						if (j == b) throw "Expected attribute name";
						f = r.substr(a, j, b - j);
						if (d.exists(f)) throw "Duplicate attribute";
						e = 0;
						g = 6;
						continue
					}
					break;
				case 6:
					switch (m) {
						case 61:
							e =
								0;
							g = 7;
							break;
						default:
							throw "Expected =";
					}
					break;
				case 7:
					switch (m) {
						case 34:
						case 39:
							e = 8;
							j = b;
							break;
						default:
							throw 'Expected "';
					}
					break;
				case 8:
					m == a.charCodeAt(j) && (g = r.substr(a, j + 1, b - j - 1), d.set(f, g), e = 0, g = 4);
					break;
				case 9:
					j = b = ia.doParse(a, b, d);
					e = 1;
					break;
				case 11:
					switch (m) {
						case 62:
							e = 1;
							break;
						default:
							throw "Expected >";
					}
					break;
				case 12:
					switch (m) {
						case 62:
							return 0 == k && c.addChild(p.createPCData("")), b;
						default:
							throw "Expected >";
					}
				case 10:
					if (!(97 <= m && 122 >= m || 65 <= m && 90 >= m || 48 <= m && 57 >= m || 58 == m || 46 == m || 95 == m || 45 == m)) {
						if (j ==
							b) throw "Expected node name";
						if (r.substr(a, j, b - j) != c.get_nodeName()) throw "Expected </" + c.get_nodeName() + ">";
						e = 0;
						g = 12;
						continue
					}
					break;
				case 15:
					45 == m && 45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (c.addChild(p.createComment(r.substr(a, j, b - j))), b += 2, e = 1);
					break;
				case 16:
					91 == m ? l++ : 93 == m ? l-- : 62 == m && 0 == l && (c.addChild(p.createDocType(r.substr(a, j, b - j))), e = 1);
					break;
				case 14:
					63 == m && 62 == a.charCodeAt(b + 1) && (b++, e = r.substr(a, j + 1, b - j - 2), c.addChild(p.createProcessingInstruction(e)), e = 1);
					break;
				case 18:
					59 == m && (j = r.substr(a,
						j, b - j), 35 == j.charCodeAt(0) ? (j = 120 == j.charCodeAt(1) ? i.parseInt("0" + r.substr(j, 1, j.length - 1)) : i.parseInt(r.substr(j, 1, j.length - 1)), n.add(String.fromCharCode(j))) : ia.escapes.exists(j) ? n.add(ia.escapes.get(j)) : n.b += "&" + j + ";", j = b + 1, e = g)
			}
			m = C.fastCodeAt(a, ++b)
		}
		1 == e && (j = b, e = 13);
		if (13 == e) return (b != j || 0 == k) && c.addChild(p.createPCData(n.b + r.substr(a, j, b - j))), b;
		throw "Unexpected end";
	};
	var I = function() {};
	f["js.Boot"] = I;
	I.__name__ = ["js", "Boot"];
	I.getClass = function(a) {
		return a instanceof Array && null == a.__enum__ ?
			Array : a.__class__
	};
	I.__string_rec = function(a, b) {
		if (null == a) return "null";
		if (5 <= b.length) return "<...>";
		var c = typeof a;
		if ("function" == c && (a.__name__ || a.__ename__)) c = "object";
		switch (c) {
			case "object":
				if (a instanceof Array) {
					if (a.__enum__) {
						if (2 == a.length) return a[0];
						for (var c = a[0] + "(", b = b + "\t", d = 2, e = a.length; d < e;) var g = d++,
							c = 2 != g ? c + ("," + I.__string_rec(a[g], b)) : c + I.__string_rec(a[g], b);
						return c + ")"
					}
					c = a.length;
					d = "[";
					b += "\t";
					for (e = 0; e < c;) g = e++, d += (0 < g ? "," : "") + I.__string_rec(a[g], b);
					return d + "]"
				}
				try {
					d = a.toString
				} catch (f) {
					return "???"
				}
				if (null !=
					d && d != Object.toString && (c = a.toString(), "[object Object]" != c)) return c;
				c = null;
				d = "{\n";
				b += "\t";
				e = null != a.hasOwnProperty;
				for (c in a)
					if (!e || a.hasOwnProperty(c)) "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + I.__string_rec(a[c], b));
				b = b.substring(1);
				return d + ("\n" + b + "}");
			case "function":
				return "<function>";
			case "string":
				return a;
			default:
				return "" + a
		}
	};
	I.__interfLoop = function(a, b) {
		if (null == a) return !1;
		if (a == b) return !0;
		var c = a.__interfaces__;
		if (null != c)
			for (var d = 0, e = c.length; d < e;) {
				var g = d++,
					g = c[g];
				if (g == b || I.__interfLoop(g, b)) return !0
			}
		return I.__interfLoop(a.__super__, b)
	};
	I.__instanceof = function(a, b) {
		if (null == b) return !1;
		switch (b) {
			case td:
				return (a | 0) === a;
			case qd:
				return "number" == typeof a;
			case rd:
				return "boolean" == typeof a;
			case String:
				return "string" == typeof a;
			case Array:
				return a instanceof Array && null == a.__enum__;
			case ud:
				return !0;
			default:
				if (null != a) {
					if ("function" == typeof b && (a instanceof b || I.__interfLoop(I.getClass(a), b))) return !0
				} else return !1;
				return b == vd && null != a.__name__ || b == wd && null != a.__ename__ ? !0 : a.__enum__ == b
		}
	};
	var jd = function() {};
	f["js.Browser"] = jd;
	jd.__name__ = ["js", "Browser"];
	jd.getLocalStorage = function() {
		try {
			var a = window.localStorage;
			a.getItem("");
			return a
		} catch (b) {
			return null
		}
	};
	var Gb = function(a, b, c) {
		this._timerStop = 0.8;
		this._timer = 0;
		this._codeEntered = !1;
		this._ctx = a;
		this._objectName = b;
		this._passcode = c;
		this._buttonDown = [];
		this._buttonDownTimer = [];
		this._buttons = []
	};
	f["screens.CodePanel"] = Gb;
	Gb.__name__ = ["screens", "CodePanel"];
	Gb.__super__ = n;
	Gb.prototype = q(n.prototype, {
		get_name: function() {
			return "CodePanel_22"
		},
		onAdded: function() {
			var a = this;
			this.owner.add(new m);
			var b = new g(this._ctx.pack.getTexture("backTap"));
			this.owner.addChild((new e).add(b));
			b.setXY(0, 0);
			b.setScale(10);
			var c = this._ctx.pack.getTexture("codePanel/codepanelBack"),
				d = new g(c);
			this.owner.addChild((new e).add(d));
			d.setXY(350 * this._ctx.gameMagnify, 260 * this._ctx.gameMagnify);
			d.centerAnchor();
			this._codeText = new S(this._ctx.segmentFont);
			this._codeText.setXY(272 *
				this._ctx.gameMagnify, 110 * this._ctx.gameMagnify);
			this.owner.addChild((new e).add(this._codeText));
			this._codeText.set_text("");
			for (d = 0; 12 > d;) d++, this._buttonDown.push(!1), this._buttonDownTimer.push(0);
			c = this._ctx.pack.getTexture("codePanel/codebutton001");
			c = new g(c);
			this.owner.addChild((new e).add(c));
			c.setXY(352 * this._ctx.gameMagnify, 382 * this._ctx.gameMagnify);
			c.centerAnchor();
			this._buttons.push(c);
			c.get_pointerDown().connect(function() {
				a._buttons[0].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown001");
				a._ctx.pack.getSound("sounds/code_button_push").play()
			});
			c.get_pointerUp().connect(function() {
				if (!a._codeEntered) {
					var b = a._codeText;
					b.set_text(b._text + "0")
				}
				a._buttonDown[0] = !0;
				a._buttons[0].texture = a._ctx.pack.getTexture("codePanel/codebutton001")
			});
			for (var d = Math.round(302 * this._ctx.gameMagnify), f = Math.round(232 * this._ctx.gameMagnify), i = 2, j = 0; 3 > j;) {
				j++;
				for (var k = 0; 3 > k;) k++, c = this._ctx.pack.getTexture("codePanel/codebutton00" + i), c = new g(c), this.owner.addChild((new e).add(c)), c.setXY(d, f), c.centerAnchor(),
					this._buttons.push(c), 2 == i && (c.get_pointerDown().connect(function() {
						a._buttons[1].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown002");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "1")
						}
						a._buttonDown[1] = !0;
						a._buttons[1].texture = a._ctx.pack.getTexture("codePanel/codebutton002")
					})), 3 == i && (c.get_pointerDown().connect(function() {
						a._buttons[2].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown003");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "2")
						}
						a._buttonDown[2] = !0;
						a._buttons[2].texture = a._ctx.pack.getTexture("codePanel/codebutton003")
					})), 4 == i && (c.get_pointerDown().connect(function() {
						a._buttons[3].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown004");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "3")
						}
						a._buttonDown[3] = !0;
						a._buttons[3].texture = a._ctx.pack.getTexture("codePanel/codebutton004")
					})), 5 == i && (c.get_pointerDown().connect(function() {
						a._buttons[4].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown005");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "4")
						}
						a._buttonDown[4] = !0;
						a._buttons[4].texture = a._ctx.pack.getTexture("codePanel/codebutton005")
					})), 6 == i && (c.get_pointerDown().connect(function() {
						a._buttons[5].texture =
							a._ctx.pack.getTexture("codePanel/codebuttonDown006");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "5")
						}
						a._buttonDown[5] = !0;
						a._buttons[5].texture = a._ctx.pack.getTexture("codePanel/codebutton006")
					})), 7 == i && (c.get_pointerDown().connect(function() {
						a._buttons[6].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown007");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b =
								a._codeText;
							b.set_text(b._text + "6")
						}
						a._buttonDown[6] = !0;
						a._buttons[6].texture = a._ctx.pack.getTexture("codePanel/codebutton007")
					})), 8 == i && (c.get_pointerDown().connect(function() {
						a._buttons[7].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown008");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "7")
						}
						a._buttonDown[7] = !0;
						a._buttons[7].texture = a._ctx.pack.getTexture("codePanel/codebutton008")
					})),
					9 == i && (c.get_pointerDown().connect(function() {
						a._buttons[8].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown009");
						a._ctx.pack.getSound("sounds/code_button_push").play()
					}), c.get_pointerUp().connect(function() {
						if (!a._codeEntered) {
							var b = a._codeText;
							b.set_text(b._text + "8")
						}
						a._buttonDown[8] = !0;
						a._buttons[8].texture = a._ctx.pack.getTexture("codePanel/codebutton009")
					})), 10 == i && (c.get_pointerDown().connect(function() {
							a._buttons[9].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown010");
							a._ctx.pack.getSound("sounds/code_button_push").play()
						}),
						c.get_pointerUp().connect(function() {
							if (!a._codeEntered) {
								var b = a._codeText;
								b.set_text(b._text + "9")
							}
							a._buttonDown[9] = !0;
							a._buttons[9].texture = a._ctx.pack.getTexture("codePanel/codebutton0010")
						})), d += Math.round(50 * this._ctx.gameMagnify), i++;
				d = Math.round(302 * this._ctx.gameMagnify);
				f += Math.round(50 * this._ctx.gameMagnify)
			}
			c = new g(this._ctx.pack.getTexture("codePanel/codebutton0011"));
			this.owner.addChild((new e).add(c));
			c.setXY(302 * this._ctx.gameMagnify, 382 * this._ctx.gameMagnify);
			c.centerAnchor();
			this._buttons.push(c);
			c.get_pointerDown().connect(function() {
				a._buttons[10].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown011");
				a._ctx.pack.getSound("sounds/code_button_push").play()
			});
			c.get_pointerUp().connect(function() {
				a._codeEntered || a._codeText.set_text(a._codeText._text.substring(0, a._codeText._text.length - 1));
				a._buttonDown[10] = !0;
				a._buttons[10].texture = a._ctx.pack.getTexture("codePanel/codebutton0011")
			});
			c = new g(this._ctx.pack.getTexture("codePanel/codebutton0012"));
			this.owner.addChild((new e).add(c));
			c.setXY(402 * this._ctx.gameMagnify, 382 * this._ctx.gameMagnify);
			c.centerAnchor();
			this._buttons.push(c);
			c.get_pointerDown().connect(function() {
				a._buttons[11].texture = a._ctx.pack.getTexture("codePanel/codebuttonDown012");
				a._ctx.pack.getSound("sounds/code_button_push").play()
			});
			c.get_pointerUp().connect(function() {
				a._codeEntered || a._codeText.set_text("");
				a._buttonDown[11] = !0;
				a._buttons[11].texture = a._ctx.pack.getTexture("codePanel/codebutton0012")
			});
			this._closeBtn = new g(this._ctx.pack.getTexture("buttons/BtnClose"));
			this.owner.addChild((new e).add(this._closeBtn));
			this._closeBtn.setXY(480 * this._ctx.gameMagnify, 70 * this._ctx.gameMagnify);
			this._closeBtn.centerAnchor();
			this._closeBtn.get_pointerDown().connect(function() {
				a._ctx.pack.getSound("sounds/button_click").play();
				a._ctx.currentLevel.closeCodePanel()
			});
			b.get_pointerDown().connect(function() {
				a._ctx.currentLevel.closeCodePanel()
			});
			b = this.owner._compMap.Sprite_0;
			b.setScale(this._ctx.gameScale);
			b.setXY(0, this._ctx.currentLevel.ySdvigCoef)
		},
		onUpdate: function(a) {
			"down" ==
			this._ctx.currentLevel.digit0 && (this._ctx.currentLevel.digit0 = "hold", this._buttons[0].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown001"), this._ctx.pack.getSound("sounds/code_button_push").play());
			if ("up" == this._ctx.currentLevel.digit0) {
				this._ctx.currentLevel.digit0 = "up_complete";
				if (!this._codeEntered) {
					var b = this._codeText;
					b.set_text(b._text + "0")
				}
				this._buttonDown[0] = !0;
				this._buttons[0].texture = this._ctx.pack.getTexture("codePanel/codebutton001")
			}
			"down" == this._ctx.currentLevel.digit1 &&
				(this._ctx.currentLevel.digit1 = "hold", this._buttons[1].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown002"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit1 && (this._ctx.currentLevel.digit1 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "1")), this._buttonDown[1] = !0, this._buttons[1].texture = this._ctx.pack.getTexture("codePanel/codebutton002"));
			"down" == this._ctx.currentLevel.digit2 && (this._ctx.currentLevel.digit2 = "hold",
				this._buttons[2].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown003"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit2 && (this._ctx.currentLevel.digit2 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "2")), this._buttonDown[2] = !0, this._buttons[2].texture = this._ctx.pack.getTexture("codePanel/codebutton003"));
			"down" == this._ctx.currentLevel.digit3 && (this._ctx.currentLevel.digit3 = "hold", this._buttons[3].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown004"),
				this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit3 && (this._ctx.currentLevel.digit3 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "3")), this._buttonDown[3] = !0, this._buttons[3].texture = this._ctx.pack.getTexture("codePanel/codebutton004"));
			"down" == this._ctx.currentLevel.digit4 && (this._ctx.currentLevel.digit4 = "hold", this._buttons[4].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown005"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit4 && (this._ctx.currentLevel.digit4 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "4")), this._buttonDown[4] = !0, this._buttons[4].texture = this._ctx.pack.getTexture("codePanel/codebutton005"));
			"down" == this._ctx.currentLevel.digit5 && (this._ctx.currentLevel.digit5 = "hold", this._buttons[5].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown006"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit5 &&
				(this._ctx.currentLevel.digit5 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "5")), this._buttonDown[5] = !0, this._buttons[5].texture = this._ctx.pack.getTexture("codePanel/codebutton006"));
			"down" == this._ctx.currentLevel.digit6 && (this._ctx.currentLevel.digit6 = "hold", this._buttons[6].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown007"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit6 && (this._ctx.currentLevel.digit6 = "up_complete",
				this._codeEntered || (b = this._codeText, b.set_text(b._text + "6")), this._buttonDown[6] = !0, this._buttons[6].texture = this._ctx.pack.getTexture("codePanel/codebutton007"));
			"down" == this._ctx.currentLevel.digit7 && (this._ctx.currentLevel.digit7 = "hold", this._buttons[7].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown008"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit7 && (this._ctx.currentLevel.digit7 = "up_complete", this._codeEntered || (b = this._codeText,
				b.set_text(b._text + "7")), this._buttonDown[7] = !0, this._buttons[7].texture = this._ctx.pack.getTexture("codePanel/codebutton008"));
			"down" == this._ctx.currentLevel.digit8 && (this._ctx.currentLevel.digit8 = "hold", this._buttons[8].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown009"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit8 && (this._ctx.currentLevel.digit8 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "8")), this._buttonDown[8] = !0, this._buttons[8].texture = this._ctx.pack.getTexture("codePanel/codebutton009"));
			"down" == this._ctx.currentLevel.digit9 && (this._ctx.currentLevel.digit9 = "hold", this._buttons[9].texture = this._ctx.pack.getTexture("codePanel/codebuttonDown010"), this._ctx.pack.getSound("sounds/code_button_push").play());
			"up" == this._ctx.currentLevel.digit9 && (this._ctx.currentLevel.digit9 = "up_complete", this._codeEntered || (b = this._codeText, b.set_text(b._text + "9")), this._buttonDown[9] = !0, this._buttons[9].texture = this._ctx.pack.getTexture("codePanel/codebutton0010"));
			4 == this._codeText._text.length && !this._codeEntered && (this._codeEntered = !0, this._ctx.currentLevel.codePanelActive = !1, this._passcode == this._codeText._text ? (this._ctx.pack.getSound("sounds/code_open").play(), this._codeText.set_text("open")) : (this._ctx.pack.getSound("sounds/code_error").play(), this._codeText.set_text("  err"), this._codeText.setXY(this._codeText.x._value - 3 * this._ctx.gameMagnify, this._codeText.y._value)));
			this._codeEntered && (this._timer += a, this._timer >= this._timerStop && ("open" == this._codeText._text &&
				(a = this._ctx.currentLevel.player._compMap.BobHero_33, a.currentPadlock._compMap.Codepad_10.CodePadDone(), a.currentPadlock._compMap.Codepad_10.removeBallon(), this._ctx.currentLevel._charactersLayer.removeChild(this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon)), this._ctx.currentLevel.closeCodePanel()))
		},
		__class__: Gb
	});
	var lc = function(a) {
		this._timerStop = 0.8;
		this._timer = 0;
		this._currentSprite = 1;
		this._ctx = a
	};
	f["screens.Comics"] = lc;
	lc.__name__ = ["screens", "Comics"];
	lc.__super__ = n;
	lc.prototype =
		q(n.prototype, {
			get_name: function() {
				return "Comics_32"
			},
			onAdded: function() {
				var a = this;
				this.owner.add(new m);
				var b = new fa(2105376, k._platform.getStage().get_width() + 600, k._platform.getStage().get_height() + 600);
				this.owner.addChild((new e).add(b));
				b.centerAnchor();
				b.setXY(0.5 * k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_height());
				this.picture1 = new g(this._ctx.comicsPack.getTexture("picture1"));
				this.owner.addChild((new e).add(this.picture1));
				this.picture1.setXY(10, 10);
				this.picture3 =
					new g(this._ctx.comicsPack.getTexture("picture3"));
				this.owner.addChild((new e).add(this.picture3));
				this.picture3.setXY(230, 10);
				this.picture4 = new g(this._ctx.comicsPack.getTexture("picture4"));
				this.owner.addChild((new e).add(this.picture4));
				this.picture4.setXY(450, 10);
				this.picture5 = new g(this._ctx.comicsPack.getTexture("picture5"));
				this.owner.addChild((new e).add(this.picture5));
				this.picture5.setXY(10, 260);
				this.picture6 = new g(this._ctx.comicsPack.getTexture("picture6"));
				this.owner.addChild((new e).add(this.picture6));
				this.picture6.setXY(230, 260);
				this.picture8 = new g(this._ctx.comicsPack.getTexture("picture8"));
				this.owner.addChild((new e).add(this.picture8));
				this.picture8.setXY(450, 260);
				this.picture2 = new g(this._ctx.comicsPack.getTexture("picture2"));
				this.owner.addChild((new e).add(this.picture2));
				this.picture2.setXY(170, 10);
				this.picture7 = new g(this._ctx.comicsPack.getTexture("picture7"));
				this.owner.addChild((new e).add(this.picture7));
				this.picture7.setXY(360, 260);
				this.picture1.alpha.set__(0);
				this.picture2.alpha.set__(0);
				this.picture3.alpha.set__(0);
				this.picture4.alpha.set__(0);
				this.picture5.alpha.set__(0);
				this.picture6.alpha.set__(0);
				this.picture7.alpha.set__(0);
				this.picture8.alpha.set__(0);
				b = new g(this._ctx.pack.getTexture("backTap"));
				this.owner.addChild((new e).add(b));
				b.setXY(0, 0);
				b.setScale(10);
				b.get_pointerDown().connect(function() {
					a._timer = a._timerStop + 1
				});
				this._currentSprite = 1;
				this._timer = this._timerStop
			},
			onUpdate: function(a) {
				this._timer += a;
				this._timer > this._timerStop && (this._timer = 0, 1 == this._currentSprite &&
					(this.picture1.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start1").play()), 2 == this._currentSprite && (this.picture2.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start2_1").play()), 3 == this._currentSprite && (this.picture3.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start2").play()), 4 == this._currentSprite && (this.picture4.alpha.animate(0,
						1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start3").play()), 5 == this._currentSprite && (this.picture5.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start4").play()), 6 == this._currentSprite && (this.picture6.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start5").play()), 7 == this._currentSprite && (this.picture7.alpha.animate(0,
						1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start5_1").play()), 8 == this._currentSprite && (this.picture8.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_start6").play()), this._currentSprite += 1, 10 == this._currentSprite && (this._comixPlayback.dispose(), this._ctx.currentLevelNumber = 1, this._ctx.stopComixMusic(), this._ctx.enterPlayingScene(), this._ctx.isLevelPointSaved = !1))
			},
			__class__: lc
		});
	var dd = function() {};
	f["screens.CompletedMenu"] = dd;
	dd.__name__ = ["screens", "CompletedMenu"];
	dd.create = function(a, b, c) {
		a.totalBatteries = a.getTotalBatteries();
		b = new e;
		b.add(new ba(!1));
		a.playMenuMusic();
		var d = new m;
		b.add(d);
		d = new g(a.pack.getTexture("screens/BackgrndWellDone"));
		d.centerAnchor();
		d.setXY(0.5 * k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_height());
		a.isSquare ? d.setScale(a.gameScaleSquare) : d.setScale(a.gameScale);
		var f = new g(a.pack.getTexture("screens/WellDone"));
		f.setXY(0.5 *
			k._platform.getStage().get_width(), 0.15 * k._platform.getStage().get_height());
		f.centerAnchor();
		f.setScale(a.gameScale);
		var i = new g(a.pack.getTexture("buttons/docsCompelete"));
		i.setXY(0.5 * k._platform.getStage().get_width(), 0.35 * k._platform.getStage().get_height());
		i.centerAnchor();
		i.setScale(a.gameScale);
		var j = new S(new R(a.pack, "fonts/Interface"));
		j.setXY(0.5 * k._platform.getStage().get_width(), 0.335 * k._platform.getStage().get_height());
		j.set_text(a.docsPickedOnLevel + "/" + a.getBatteriesInLevel(a.currentLevelNumber -
			1));
		j.setScale(a.gameScale);
		var n = new g(a.pack.getTexture("screens/WinStar"));
		n.setXY(0.5 * k._platform.getStage().get_width(), 0.75 * k._platform.getStage().get_height());
		n.centerAnchor();
		var o = new g(a.pack.getTexture("screens/WinStar"));
		o.setXY(n.x._value - 1.2 * n.getNaturalWidth() * a.gameScale, 0.75 * k._platform.getStage().get_height());
		o.centerAnchor();
		var q = new g(a.pack.getTexture("screens/WinStar"));
		q.setXY(n.x._value + 1.2 * n.getNaturalWidth() * a.gameScale, 0.75 * k._platform.getStage().get_height());
		q.centerAnchor();
		var p = new g(a.pack.getTexture("screens/WinStarFull"));
		p.setXY(n.x._value - 1.2 * n.getNaturalWidth() * a.gameScale, 0.75 * k._platform.getStage().get_height());
		p.setScale(0);
		p.centerAnchor();
		var r = new g(a.pack.getTexture("screens/WinStarFull"));
		r.setXY(0.5 * k._platform.getStage().get_width(), 0.75 * k._platform.getStage().get_height());
		r.setScale(0);
		r.centerAnchor();
		var t = new g(a.pack.getTexture("screens/WinStarFull"));
		t.setXY(n.x._value + 1.2 * n.getNaturalWidth() * a.gameScale, 0.75 * k._platform.getStage().get_height());
		t.setScale(0);
		t.centerAnchor();
		o.setScale(a.gameScale);
		n.setScale(a.gameScale);
		q.setScale(a.gameScale);
		b.addChild((new e).add(d));
		b.addChild((new e).add(f));
		b.addChild((new e).add(o));
		b.addChild((new e).add(n));
		b.addChild((new e).add(q));
		b.addChild((new e).add(p));
		b.addChild((new e).add(r));
		b.addChild((new e).add(t));
		b.addChild((new e).add(i));
		b.addChild((new e).add(j));
		1 <= a.starsForLevelCompletedScreen && (p.scaleX.animate(p.scaleX._value, 1.5 * o.scaleX._value, 0.3, l.linear), p.scaleY.animate(p.scaleY._value,
			1.5 * o.scaleX._value, 0.3, l.linear), p.rotation.animate(0, 360, 0.3, l.linear));
		p.scaleX.get_changed().connect(function(b) {
			b >= 1.5 * o.scaleX._value && (p.scaleX.animate(p.scaleX._value, o.scaleX._value, 0.3, l.linear), p.scaleY.animate(p.scaleY._value, o.scaleX._value, 0.3, l.linear), a.pack.getSound("sounds/star1").play(), 2 <= a.starsForLevelCompletedScreen && (r.scaleX.animate(r.scaleX._value, 1.5 * o.scaleX._value, 0.3, l.linear), r.scaleY.animate(r.scaleY._value, 1.5 * o.scaleX._value, 0.3, l.linear), r.rotation.animate(0, 360,
				0.3, l.linear)))
		});
		r.scaleX.get_changed().connect(function(b) {
			b >= 1.5 * o.scaleX._value && (r.scaleX.animate(r.scaleX._value, o.scaleX._value, 0.3, l.linear), r.scaleY.animate(r.scaleY._value, o.scaleX._value, 0.3, l.linear), a.pack.getSound("sounds/star2").play(), 3 <= a.starsForLevelCompletedScreen && (t.scaleX.animate(t.scaleX._value, 1.5 * o.scaleX._value, 0.3, l.linear), t.scaleY.animate(t.scaleY._value, 1.5 * o.scaleX._value, 0.3, l.linear), t.rotation.animate(0, 360, 0.3, l.linear)))
		});
		t.scaleX.get_changed().connect(function(b) {
			b >=
				1.5 * o.scaleX._value && (t.scaleX.animate(t.scaleX._value, o.scaleX._value, 0.3, l.linear), t.scaleY.animate(t.scaleY._value, o.scaleX._value, 0.3, l.linear), a.pack.getSound("sounds/star3").play())
		});
		d = new e;
		f = -120 * a.gameScale;
		for (i = 0; i < c.length;) n = c[i++], j = [c[i++]], n = new g(a.pack.getTexture("buttons/" + n)), n.setXY(f, 0.9 * k._platform.getStage().get_height()), n.setScale(a.gameScale), n.centerAnchor(), n.get_pointerDown().connect(function(b) {
				return function() {
					a.pack.getSound("sounds/button_click").play();
					b[0]()
				}
			}(j)),
			f += 120 * a.gameScale, d.addChild((new e).add(n));
		m.getBounds(d);
		c = new m;
		c.centerAnchor();
		c.x.animate(k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_width(), 0.5, l.backOut);
		b.addChild(d.add(c));
		return b
	};
	var Fb = function(a, b, c) {
		this._qElementsMenu = 9;
		this._currentElement = 1;
		this._ctx = a;
		this._objectName = b;
		this._passcode = c;
		this.textElements = [];
		this.pictureIndexs = [];
		this.tempTextElements = [];
		this.tempPictureIndexs = []
	};
	f["screens.ComputerScreen"] = Fb;
	Fb.__name__ = ["screens", "ComputerScreen"];
	Fb.__super__ = n;
	Fb.prototype = q(n.prototype, {
		get_name: function() {
			return "ComputerScreen_23"
		},
		onAdded: function() {
			var a = this;
			this.owner.add(new m);
			var b = new g(this._ctx.pack.getTexture("backTap"));
			this.owner.addChild((new e).add(b));
			b.setXY(0, 0);
			var c = this._ctx.pack.getTexture("monitor/MonitorBack"),
				c = new g(c);
			this.owner.addChild((new e).add(c));
			c.setXY(350 * this._ctx.gameMagnify, 270 * this._ctx.gameMagnify);
			c.centerAnchor();
			4 == this._ctx.currentLevelNumber && (c = new g(this._ctx.pack.getTexture("tutorial/computerTip")),
				this.owner.addChild((new e).add(c)), c.setXY(10, 400));
			c = new g(this._ctx.pack.getTexture("monitor/MonitorLine"));
			this.owner.addChild((new e).add(c));
			c.setXY(370 * this._ctx.gameMagnify, 255 * this._ctx.gameMagnify);
			c.centerAnchor();
			this._selector = new g(this._ctx.pack.getTexture("monitor/MonitorSelector"));
			this.owner.addChild((new e).add(this._selector));
			this._selector.setXY(272 * this._ctx.gameMagnify, 166 * this._ctx.gameMagnify);
			this._selector.centerAnchor();
			this.picture1 = new g(this._ctx.pack.getTexture("monitor/doorCodeTxt"));
			this.owner.addChild((new e).add(this.picture1));
			this.picture1.setXY(440 * this._ctx.gameMagnify, 250 * this._ctx.gameMagnify);
			this.picture1.centerAnchor();
			this.picture2 = new g(this._ctx.pack.getTexture("monitor/asciibob"));
			this.owner.addChild((new e).add(this.picture2));
			this.picture2.setXY(440 * this._ctx.gameMagnify, 250 * this._ctx.gameMagnify);
			this.picture2.centerAnchor();
			this.picture3 = new g(this._ctx.pack.getTexture("monitor/blackcat"));
			this.owner.addChild((new e).add(this.picture3));
			this.picture3.setXY(440 *
				this._ctx.gameMagnify, 250 * this._ctx.gameMagnify);
			this.picture3.centerAnchor();
			this.picture4 = new g(this._ctx.pack.getTexture("monitor/superspy"));
			this.owner.addChild((new e).add(this.picture4));
			this.picture4.setXY(440 * this._ctx.gameMagnify, 250 * this._ctx.gameMagnify);
			this.picture4.centerAnchor();
			this.picture5 = new g(this._ctx.pack.getTexture("monitor/house"));
			this.owner.addChild((new e).add(this.picture5));
			this.picture5.setXY(440 * this._ctx.gameMagnify, 250 * this._ctx.gameMagnify);
			this.picture5.centerAnchor();
			for (var c = 0, d = this._qElementsMenu; c < d;) this.element1 = new S(this._ctx.computerLight), this.textElements.push(this.element1), 0 == c && (this.element1.set_text("house.txt"), this.pictureIndexs.push(5)), 1 == c && (this.element1.set_text("system.bat"), this.pictureIndexs.push(0)), 2 == c && (this.element1.set_text("autoexec.bat"), this.pictureIndexs.push(0)), 3 == c && (this.element1.set_text("commmand.com"), this.pictureIndexs.push(0)), 4 == c && (this.element1.set_text("config.sys"), this.pictureIndexs.push(0)), 5 == c && (this.element1.set_text("asciibob.txt"),
				this.pictureIndexs.push(2)), 6 == c && (this.element1.set_text("superspy.txt"), this.pictureIndexs.push(4)), 7 == c && (this.element1.set_text("blackcat.txt"), this.pictureIndexs.push(3)), 8 == c && (this.element1.set_text("boot.dat"), this.pictureIndexs.push(0)), ++c;
			4 == this._ctx.currentLevelNumber && (this._qElementsMenu = 3);
			6 == this._ctx.currentLevelNumber && (this._qElementsMenu = 4);
			7 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevelPart && (this._qElementsMenu = 5);
			7 == this._ctx.currentLevelNumber && 2 == this._ctx.currentLevelPart &&
				(this._qElementsMenu = 6);
			8 == this._ctx.currentLevelNumber && (this._qElementsMenu = 7);
			10 == this._ctx.currentLevelNumber && 1 == this._ctx.currentLevelPart && (this._qElementsMenu = 8);
			10 == this._ctx.currentLevelNumber && 2 == this._ctx.currentLevelPart && (this._qElementsMenu = 9);
			this.generateMenu(this._qElementsMenu);
			b.get_pointerDown().connect(function() {
				a._ctx.currentLevel.closeComputerScreen()
			});
			b = this.owner._compMap.Sprite_0;
			b.setScale(this._ctx.gameScale);
			b.setXY(0, this._ctx.currentLevel.ySdvigCoef);
			this.codePicture1 =
				new g(this._ctx.pack.getTexture("monitor/monitorNum" + this._passcode.charAt(0)));
			this.owner.addChild((new e).add(this.codePicture1));
			this.codePicture1.setXY(400 * this._ctx.gameMagnify, 295 * this._ctx.gameMagnify);
			this.codePicture1.centerAnchor();
			this.codePicture2 = new g(this._ctx.pack.getTexture("monitor/monitorNum" + this._passcode.charAt(1)));
			this.owner.addChild((new e).add(this.codePicture2));
			this.codePicture2.setXY(430 * this._ctx.gameMagnify, 295 * this._ctx.gameMagnify);
			this.codePicture2.centerAnchor();
			this.codePicture3 = new g(this._ctx.pack.getTexture("monitor/monitorNum" + this._passcode.charAt(2)));
			this.owner.addChild((new e).add(this.codePicture3));
			this.codePicture3.setXY(460 * this._ctx.gameMagnify, 295 * this._ctx.gameMagnify);
			this.codePicture3.centerAnchor();
			this.codePicture4 = new g(this._ctx.pack.getTexture("monitor/monitorNum" + this._passcode.charAt(3)));
			this.owner.addChild((new e).add(this.codePicture4));
			this.codePicture4.setXY(490 * this._ctx.gameMagnify, 295 * this._ctx.gameMagnify);
			this.codePicture4.centerAnchor();
			this._currentElement = 2;
			this.sortElements()
		},
		onUpdate: function() {
			this._ctx.currentLevel.actionKey ? (this._ctx.currentLevel.actionKey = !1, this._currentElement -= 1, 1 > this._currentElement && (this._currentElement = this._qElementsMenu), this.sortElements(), this._ctx.pack.getSound("sounds/computer_cursor").play()) : this._ctx.currentLevel.downKey && (this._ctx.currentLevel.downKey = !1, this._currentElement += 1, this._currentElement > this._qElementsMenu && (this._currentElement = 1), this.sortElements(), this._ctx.pack.getSound("sounds/computer_cursor").play())
		},
		generateMenu: function(a) {
			for (var b = this, c = 0; 0 < a;) c = Math.floor(Math.random() * this.textElements.length), this.owner.addChild((new e).add(this.textElements[c])), this.tempTextElements.push(this.textElements[c]), this.tempPictureIndexs.push(this.pictureIndexs[c]), this.textElements.splice(c, 1), this.pictureIndexs.splice(c, 1), a -= 1;
			c = Math.floor(Math.random() * this.tempTextElements.length);
			0 == c && (c = 1);
			this.tempTextElements[c].set_text("reminder.txt");
			this.tempPictureIndexs[c] = 1;
			for (var a = Math.round(138), c = Math.round(27 *
					this._ctx.gameMagnify), d = 0, g = this._qElementsMenu; d < g;) this.tempTextElements[d].setXY(190 * this._ctx.gameMagnify, a), a += c, 0 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 1;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 1 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 2;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 2 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement =
						3;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 3 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 4;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 4 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 5;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 5 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 6;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 6 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 7;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 7 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 8;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}), 8 == d && this.tempTextElements[d].get_pointerDown().connect(function() {
					b._currentElement = 9;
					b.sortElements();
					b._ctx.pack.getSound("sounds/computer_cursor").play()
				}),
				++d
		},
		sortElements: function() {
			this.codePicture1.set_visible(!1);
			this.codePicture2.set_visible(!1);
			this.codePicture3.set_visible(!1);
			this.codePicture4.set_visible(!1);
			this.picture1.set_visible(!1);
			this.picture2.set_visible(!1);
			this.picture3.set_visible(!1);
			this.picture4.set_visible(!1);
			this.picture5.set_visible(!1);
			this._selector.setXY(this._selector.x._value, this.tempTextElements[this._currentElement - 1].y._value + 6 * this._ctx.gameMagnify);
			for (var a = 0, b = this._qElementsMenu; a < b;) this.tempTextElements[a].set_font(this._ctx.computerDark),
				++a;
			this.tempTextElements[this._currentElement - 1].set_font(this._ctx.computerLight);
			1 == this.tempPictureIndexs[this._currentElement - 1] && (this.codePicture1.set_visible(!0), this.codePicture2.set_visible(!0), this.codePicture3.set_visible(!0), this.codePicture4.set_visible(!0), this.picture1.set_visible(!0));
			2 == this.tempPictureIndexs[this._currentElement - 1] && this.picture2.set_visible(!0);
			3 == this.tempPictureIndexs[this._currentElement - 1] && this.picture3.set_visible(!0);
			4 == this.tempPictureIndexs[this._currentElement -
				1] && this.picture4.set_visible(!0);
			5 == this.tempPictureIndexs[this._currentElement - 1] && this.picture5.set_visible(!0)
		},
		__class__: Fb
	});
	var $c = function() {};
	f["screens.EmptyScene"] = $c;
	$c.__name__ = ["screens", "EmptyScene"];
	$c.create = function() {
		var a = new e,
			b = new m;
		a.add(b);
		b = new fa(0, 750, 600);
		a.addChild((new e).add(b));
		return a
	};
	var mc = function(a) {
		this._timerStop = 2.8;
		this._timer = 0;
		this._currentSprite = 1;
		this._ctx = a
	};
	f["screens.FinalComics"] = mc;
	mc.__name__ = ["screens", "FinalComics"];
	mc.__super__ = n;
	mc.prototype =
		q(n.prototype, {
			get_name: function() {
				return "FinalComics_37"
			},
			onAdded: function() {
				var a = this;
				this.owner.add(new m);
				var b = new fa(2105376, this._ctx.targetWidth + 10 * this._ctx.gameMagnify, this._ctx.targetHeight * this._ctx.gameMagnify);
				this.owner.addChild((new e).add(b));
				this.picture1 = new g(this._ctx.finalComicsPack.getTexture("finpic1"));
				this.owner.addChild((new e).add(this.picture1));
				this.picture1.setXY(20, 30);
				this.picture2 = new g(this._ctx.finalComicsPack.getTexture("finpic2"));
				this.owner.addChild((new e).add(this.picture2));
				this.picture2.setXY(435, 30);
				this.picture3 = new g(this._ctx.finalComicsPack.getTexture("finpic3"));
				this.owner.addChild((new e).add(this.picture3));
				this.picture3.setXY(20, 280);
				this.picture4 = new g(this._ctx.finalComicsPack.getTexture("finpic4"));
				this.owner.addChild((new e).add(this.picture4));
				this.picture4.setXY(288, 280);
				this.picture1.alpha.set__(0);
				this.picture2.alpha.set__(0);
				this.picture3.alpha.set__(0);
				this.picture4.alpha.set__(0);
				b = new g(this._ctx.pack.getTexture("backTap"));
				this.owner.addChild((new e).add(b));
				b.setXY(0, 0);
				b.setScale(10);
				b.get_pointerDown().connect(function() {
					a._timer = a._timerStop + 1
				});
				this._currentSprite = 1;
				this._timer = this._timerStop
			},
			onUpdate: function(a) {
				this._timer += a;
				this._timer > this._timerStop && (this._timer = 0, 1 == this._currentSprite && (this.picture1.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_final1").play()), 2 == this._currentSprite && (this.picture2.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_final2").play()),
					3 == this._currentSprite && (this.picture3.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_final3").play()), 4 == this._currentSprite && (this.picture4.alpha.animate(0, 1, 0.4, l.backIn), this._comixPlayback.dispose(), this._comixPlayback = this._ctx.pack.getSound("sounds/comix_final4").play()), this._currentSprite += 1, 6 == this._currentSprite && (this._ctx.isLevelPointSaved = !1, this._ctx.stopComixMusic(), this._comixPlayback.dispose(), this._ctx.enterEmptyScene(),
						this._ctx.enterLevelMap()))
			},
			__class__: mc
		});
	var Yc = function() {};
	f["screens.FinalScene"] = Yc;
	Yc.__name__ = ["screens", "FinalScene"];
	Yc.create = function(a) {
		var b = new e,
			c = new m;
		b.add(c);
		c = new mc(a);
		b.addChild((new e).add(c));
		c = b._compMap.Sprite_0;
		c.setScale(a.gameScale);
		c.setXY(0, 0);
		a.stopMenuMusic();
		return b
	};
	var qb = function() {};
	f["screens.GameScene"] = qb;
	qb.__name__ = ["screens", "GameScene"];
	qb.create = function(a) {
		var b = new e,
			c = new g(a.pack.getTexture("backLevels"));
		c.setXY(0, 0);
		b.addChild((new e).add(c));
		a.isSquare ? c.setScale(a.gameScaleSquare) : c.setScale(a.gameScale);
		c = new S(a.interfaceFont);
		c.setXY(240 * a.currentScaleCoef, 22 * a.currentScaleCoef);
		c.set_text("");
		var d = new vb(a);
		a.currentLevel = d;
		b.add(d);
		d.pauseBtn.get_pointerDown().connect(function() {
			a.currentLevel.paused.set__(!0);
			a.pack.getSound("sounds/button_click").play();
			a.showPrompt(a.messages.get("paused"), ["Play", function() {
				h5ads.adWrapper.once("onContentPaused", function() {});
				h5ads.adWrapper.once("onContentResumed", function() {
					a.currentLevel.paused.set__(!1);
					a.director.unwindToScene(b)
				});
				h5ads.adWrapper.showAd(h5ads.AdType.interstitial)
			}, "Home", function() {
				d.stopMusic();
				a.isLevelPointSaved = !1;
				a.resetSaveArrays();
				a.director.unwindToScene(b);
				a.enterLevelMap()
			}])
		});
		d.restartBtn.get_pointerDown().connect(function() {
			a.levelTry += 1;
			a.pack.getSound("sounds/button_click").play();
			d.stopMusic();
			a.currentLevel.restart.set__(!0);
			a.director.unwindToScene(b);
			a.restartScene()
		});
		d.watch.watch(function(a) {
			999 > a && d.timeLabel.set_text("" + a)
		});
		d.score.watch(function(c) {
			0 >=
				c && (c = new fa(2105376, k._platform.getStage().get_width() + 100, k._platform.getStage().get_height() + 300), b.addChild((new e).add(c)), d.stopMusic(), a.showGameover(a.messages.get("game_over"), ["Replay", function() {
					a.currentScreen = "game";
					a.director.unwindToScene(b);
					a.restartScene()
				}, "Home", function() {
					a.currentScreen = "game";
					a.isLevelPointSaved = !1;
					a.resetSaveArrays();
					a.director.unwindToScene(b);
					a.enterLevelMap()
				}]))
		});
		d.batery.watch(function(b) {
			10 > b ? d.bateryLabel.setXY(190 + a.centerCoefX, 24 + a.centerCoefY) : d.bateryLabel.setXY(180 +
				a.centerCoefX, 24 + a.centerCoefY);
			d.bateryLabel.set_text("" + b)
		});
		d.talert.watch(function() {});
		d.levelWin.watch(function(c) {
			c && (c = new fa(2105376, k._platform.getStage().get_width() + 100, k._platform.getStage().get_height() + 300), b.addChild((new e).add(c)), d.stopMusic(), a.showCompelted(a.messages.get("win"), ["Replay", function() {
				a.currentScreen = "game";
				a.isLevelPointSaved = !1;
				a.resetSaveArrays();
				a.director.unwindToScene(b);
				a.restartScene()
			}, "PlayNext", function() {
				a.currentScreen = "game";
				a.director.unwindToScene(b);
				a.isLevelPointSaved = !1;
				a.resetSaveArrays();
				10 > a.currentLevelNumber ? (a.currentLevelNumber += 1, a.enterEmptyScene(), a.showAdGameplay()) : (a.stopMenuMusic(), a.playComixMusic(), a.enterFinalComics())
			}, "Home", function() {
				a.currentScreen = "game";
				a.isLevelPointSaved = !1;
				a.resetSaveArrays();
				10 > a.currentLevelNumber ? (a.director.unwindToScene(b), a.enterLevelMap()) : (a.stopMenuMusic(), a.playComixMusic(), a.enterFinalComics())
			}]))
		});
		return b
	};
	var cd = function() {};
	f["screens.GameoverMenu"] = cd;
	cd.__name__ = ["screens", "GameoverMenu"];
	cd.create = function(a, b, c) {
		b = new e;
		b.add(new ba(!1));
		var d = new m;
		b.add(d);
		d = new g(a.pack.getTexture("screens/BackgrndBusted"));
		d.centerAnchor();
		d.setXY(0.5 * k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_height());
		a.isSquare ? d.setScale(a.gameScaleSquare) : d.setScale(a.gameScale);
		var f = new g(a.pack.getTexture("screens/Busted"));
		f.setXY(0.5 * k._platform.getStage().get_width(), 0.2 * k._platform.getStage().get_height());
		f.centerAnchor();
		f.setScale(a.gameScale);
		b.addChild((new e).add(d));
		b.addChild((new e).add(f));
		for (var d = new e, i = f = 0; i < c.length;) {
			var j = c[i++],
				n = [c[i++]],
				j = new g(a.pack.getTexture("buttons/" + j));
			j.setXY(f, 0.8 * k._platform.getStage().get_height());
			j.setScale(a.gameScale);
			j.get_pointerDown().connect(function(b) {
				return function() {
					a.pack.getSound("sounds/button_click").play();
					b[0]()
				}
			}(n));
			f += 120 * a.gameScale;
			d.addChild((new e).add(j))
		}
		c = m.getBounds(d);
		f = new m;
		f.x.animate(k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_width() - 0.5 * c.width, 0.5, l.backOut);
		b.addChild(d.add(f));
		return b
	};
	var Hb = function(a, b) {
		this.regenerate = !1;
		this.gridSize = 29;
		this.deltaY = 72;
		this.deltaX = 29;
		this._isMarkerMove = !1;
		this._markerPos = new rc;
		this._timerMarkerStop = 0.12;
		this._timerMarker = 0;
		this._timerStop = 0.8;
		this._timer = 0;
		this._targetReach = !1;
		this.hackPanelActive = !0;
		this._ctx = a;
		this._objectName = b;
		5 == a.currentLevelNumber && (this.kolHodov = 4);
		6 == a.currentLevelNumber && (this.kolHodov = 5);
		7 == a.currentLevelNumber && (this.kolHodov = 6);
		8 == a.currentLevelNumber && (this.kolHodov = 7);
		9 == a.currentLevelNumber &&
			(this.kolHodov = 8);
		10 == a.currentLevelNumber && (this.kolHodov = 9)
	};
	f["screens.HackKitPanel"] = Hb;
	Hb.__name__ = ["screens", "HackKitPanel"];
	Hb.__super__ = n;
	Hb.prototype = q(n.prototype, {
		get_name: function() {
			return "HackKitPanel_25"
		},
		onAdded: function() {
			var a = this;
			this.owner.add(new m);
			var b = new g(this._ctx.pack.getTexture("backTap"));
			this.owner.addChild((new e).add(b));
			b.setXY(0, 0);
			b.setScale(10);
			var c = this._ctx.pack.getTexture("hackerPanel/panelBack"),
				c = new g(c);
			this.owner.addChild((new e).add(c));
			c.setXY(160 *
				this._ctx.gameMagnify, 260 * this._ctx.gameMagnify);
			c.centerAnchor();
			5 == this._ctx.currentLevelNumber && (c = new g(this._ctx.pack.getTexture("tutorial/hackKitTip")), this.owner.addChild((new e).add(c)), c.setXY(-170, 400));
			for (this.regenerate = !0; this.regenerate;) this.regenerate = !1, this.generateGame();
			for (c = 0; 11 > c;)
				for (var d = c++, f = 0; 13 > f;) {
					var j = f++;
					2 == this.grid[d][j] && this.setBlock(d, j);
					3 == this.grid[d][j] && this.setTarget(d, j)
				}
			this.setMarker(this.markerX, this.markerY);
			c = new g(this._ctx.pack.getTexture("hackerPanel/tapZone"));
			this.owner.addChild((new e).add(c));
			c.setXY(160 * this._ctx.gameMagnify, 260 * this._ctx.gameMagnify);
			c.centerAnchor();
			c.setScale(10);
			c.get_pointerDown().connect(function(b) {
				var c = i.int(k._platform.getStage().get_width() / a._ctx.gameScale - a._ctx.targetWidth),
					d = i.int(k._platform.getStage().get_height() / a._ctx.gameScale - a._ctx.targetHeight),
					c = b.viewX / a._ctx.gameScale - c / 2,
					b = b.viewY / a._ctx.gameScale - d / 2;
				c < a._markerPos.x && 50 > Math.abs(b - a._markerPos.y) && !a._isMarkerMove && (a._markerDirection = "left", a._isMarkerMove = !0, a._marker.rotation.set__(-90));
				c > a._markerPos.x && 50 > Math.abs(b - a._markerPos.y) && !a._isMarkerMove && (a._markerDirection = "right", a._isMarkerMove = !0, a._marker.rotation.set__(90));
				b < a._markerPos.y && 50 > Math.abs(c - a._markerPos.x) && !a._isMarkerMove && (a._markerDirection = "up", a._isMarkerMove = !0, a._marker.rotation.set__(0));
				b > a._markerPos.y && 50 > Math.abs(c - a._markerPos.x) && !a._isMarkerMove && (a._markerDirection = "down", a._isMarkerMove = !0, a._marker.rotation.set__(180))
			});
			b.get_pointerDown().connect(function() {
				a._ctx.currentLevel.closeHackPanel()
			});
			b = this.owner._compMap.Sprite_0;
			b.setScale(this._ctx.gameScale);
			b.setXY(184, this._ctx.currentLevel.ySdvigCoef);
			this._ctx.currentLevel.actionKey = !1
		},
		onUpdate: function(a) {
			this.hackPanelActive && (this._ctx.currentLevel.actionKey && !this._isMarkerMove && (this._ctx.currentLevel.actionKey = !1, this._markerDirection = "up", this._isMarkerMove = !0, this._marker.rotation.set__(0)), this._ctx.currentLevel.downKey && !this._isMarkerMove && (this._ctx.currentLevel.downKey = !1, this._markerDirection = "down", this._isMarkerMove = !0,
				this._marker.rotation.set__(180)), this._ctx.currentLevel.leftKey && !this._isMarkerMove && (this._ctx.currentLevel.leftKey = !1, this._markerDirection = "left", this._isMarkerMove = !0, this._marker.rotation.set__(-90)), this._ctx.currentLevel.rightKey && !this._isMarkerMove && (this._ctx.currentLevel.rightKey = !1, this._markerDirection = "right", this._isMarkerMove = !0, this._marker.rotation.set__(90)));
			if (this._isMarkerMove) {
				this._timerMarker += a;
				var b = this._markerAlpha.alpha;
				b.set__(b._value - 0.3);
				this._timerMarker >= this._timerMarkerStop &&
					(this._timerMarker = 0, this.MoveMarker())
			}
			this._targetReach && (this._timer += a, this._timer >= this._timerStop && (this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock._compMap.Stair_13.removeBallon(), this._ctx.currentLevel._charactersLayer.removeChild(this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon), this._ctx.currentLevel.FindAndOpenDoor(this._objectName), this._ctx.currentLevel.closeHackPanel()))
		},
		MoveMarker: function() {
			this._markerAlpha.setXY(this._markerPos.x, this._markerPos.y);
			this._markerAlpha.alpha.set__(1);
			this._markerAlpha.rotation.set__(this._marker.rotation._value);
			"left" == this._markerDirection && (this.checkBlocks(this._markerPos.x - this.gridSize * this._ctx.gameMagnify, this._markerPos.y) ? this._isMarkerMove = !1 : (this._markerPos.x -= this.gridSize * this._ctx.gameMagnify, this._ctx.pack.getSound("sounds/computer_cursor").play()));
			"right" == this._markerDirection && (this.checkBlocks(this._markerPos.x + this.gridSize * this._ctx.gameMagnify, this._markerPos.y) ? this._isMarkerMove = !1 : (this._markerPos.x +=
				this.gridSize * this._ctx.gameMagnify, this._ctx.pack.getSound("sounds/computer_cursor").play()));
			"up" == this._markerDirection && (this.checkBlocks(this._markerPos.x, this._markerPos.y - this.gridSize * this._ctx.gameMagnify) ? this._isMarkerMove = !1 : (this._markerPos.y -= this.gridSize * this._ctx.gameMagnify, this._ctx.pack.getSound("sounds/computer_cursor").play()));
			"down" == this._markerDirection && (this.checkBlocks(this._markerPos.x, this._markerPos.y + this.gridSize * this._ctx.gameMagnify) ? this._isMarkerMove = !1 : (this._markerPos.y +=
				this.gridSize * this._ctx.gameMagnify, this._ctx.pack.getSound("sounds/computer_cursor").play()));
			this._marker.setXY(this._markerPos.x, this._markerPos.y);
			if (this._markerPos.x < (this.gridSize + this.deltaX) * this._ctx.gameMagnify || this._markerPos.x > (10 * this.gridSize + this.deltaX) * this._ctx.gameMagnify || this._markerPos.y < (this.gridSize + this.deltaY) * this._ctx.gameMagnify || this._markerPos.y > (13 * this.gridSize + this.deltaY) * this._ctx.gameMagnify) this._ctx.pack.getSound("sounds/hacker_toolkit_error").play(), this._ctx.currentLevel.closeHackPanel();
			1 > Math.abs(this._markerPos.x - this._target.x._value) && 1 > Math.abs(this._markerPos.y - this._target.y._value) && (this._isMarkerMove = !1, this._targetReach = !0, this.hackPanelActive = !1, this._marker.set_visible(!1), this._markerAlpha.set_visible(!1), this._target.texture = this._ctx.pack.getTexture("hackerPanel/targetFull"), this._ctx.pack.getSound("sounds/hacker_toolkit_win").play())
		},
		checkBlocks: function(a, b) {
			for (var c = 0, d = this.blocks.length; c < d;) {
				if (1 > Math.abs(a - this.blocks[c].x._value) && 1 > Math.abs(b - this.blocks[c].y._value)) return !0;
				++c
			}
			return !1
		},
		generateGame: function() {
			this.markersPos = [];
			this.grid = [];
			this.blocks = [];
			for (var a = 0; 11 > a;) {
				a++;
				this.gridLine = [];
				for (var b = 0; 13 > b;) b++, this.gridLine.push(0);
				this.grid.push(this.gridLine)
			}
			this.idx = Math.floor(7 * Math.random()) + 2;
			this.idy = Math.floor(10 * Math.random()) + 1;
			this.markerX = this.idx;
			this.markerY = this.idy;
			this.grid[this.idx][this.idy] = -1;
			this.markersPos.push(new ha(this.idx, this.idy));
			this.direction = this.getDirection(Math.floor(8 * Math.random()));
			a = 1;
			for (b = this.kolHodov; a <= b;) this.newDirection(),
				this.changeDirection(), 4 == a && this.setChoice(), ++a;
			this.newTarget()
		},
		setChoice: function() {
			"left" == this.direction && (this.steps = Math.floor(Math.random() * (this.idx - 1)) + 1, 0 == this.checkPlace(this.idx - this.steps, this.idy) ? this.grid[this.idx - this.steps][this.idy] = 2 : this.regenerate = !0);
			"right" == this.direction && (this.steps = Math.floor(Math.random() * (9 - this.idx)) + 1, 0 == this.checkPlace(this.idx + this.steps, this.idy) ? this.grid[this.idx + this.steps][this.idy] = 2 : this.regenerate = !0);
			"up" == this.direction && (this.steps =
				Math.floor(Math.random() * (this.idy - 1)) + 1, 0 == this.checkPlace(this.idx, this.idy - this.steps) ? this.grid[this.idx][this.idy - this.steps] = 2 : this.regenerate = !0);
			"down" == this.direction && (this.steps = Math.floor(Math.random() * (12 - this.idy)) + 1, 0 == this.checkPlace(this.idx, this.idy + this.steps) ? this.grid[this.idx][this.idy + this.steps] = 2 : this.regenerate = !0)
		},
		changeDirection: function() {
			if ("left" == this.direction || "right" == this.direction) this.direction = 5 > 10 * Math.random() ? "up" : "down";
			else if ("up" == this.direction || "down" ==
				this.direction) this.direction = 5 > 10 * Math.random() ? "left" : "right"
		},
		newTarget: function() {
			this.steps = Math.floor(7 * Math.random()) + 2;
			"left" == this.direction && 2 > this.idx - this.steps && (this.direction = "right");
			"right" == this.direction && 9 < this.idx + this.steps && (this.direction = "left");
			"up" == this.direction && 2 > this.idy - this.steps && (this.direction = "down");
			"down" == this.direction && 12 < this.idy + this.steps && (this.direction = "up");
			this.isGo = !0;
			for (var a = 0; a < this.steps;) {
				this.moveGenMarker();
				if (!1 == this.isGo) break;
				++a
			}
			2 > this.checkPlace(this.idx,
				this.idy) && -1 != this.checkPlace(this.idx, this.idy) && 3 < Math.abs(this.markerX - this.idx) && 3 < Math.abs(this.markerY - this.idy) ? this.grid[this.idx][this.idy] = 3 : this.regenerate = !0;
			var a = 1,
				b = this.markersPos.length,
				c, d, e;
			d = this.markersPos[0].x;
			e = this.markersPos[0].y;
			if (!this.regenerate)
				for (; a < b;) {
					if (3 > a) {
						if (this.markersPos[a].x == this.idx || this.markersPos[a].y == this.idy) this.regenerate = !0
					} else if ((this.markersPos[a].x == this.idx || this.markersPos[a].y == this.idy) && (this.markersPos[a].x == this.markerX || this.markersPos[a].y ==
							this.markerY)) this.regenerate = !0;
					if (this.markersPos[a].x == this.idx) {
						c = this.markersPos[a].x < this.idx ? "right" : "left";
						for (var g = 0, f = Math.abs(this.markersPos[a].x - this.idx); g < f;) {
							d = "right" == c ? d + 1 : d - 1;
							if (2 == this.checkPlace(d, this.idy)) {
								this.regenerate = !0;
								break
							}++g
						}
					}
					if (this.markersPos[a].y == this.idy) {
						c = this.markersPos[a].y < this.idy ? "up" : "down";
						d = 0;
						for (g = Math.abs(this.markersPos[a].y - this.idy); d < g;) {
							e = "up" == c ? e + 1 : e - 1;
							if (2 == this.checkPlace(this.idx, e)) {
								this.regenerate = !0;
								break
							}++d
						}
					}
					if (this.regenerate) break;
					++a;
					d = this.markersPos[a - 1].x;
					e = this.markersPos[a - 1].y
				}
		},
		newDirection: function() {
			this.steps = Math.floor(5 * Math.random()) + 2;
			"left" == this.direction && 2 > this.idx - this.steps && (this.direction = "right");
			"right" == this.direction && 9 < this.idx + this.steps && (this.direction = "left");
			"up" == this.direction && 2 > this.idy - this.steps && (this.direction = "down");
			"down" == this.direction && 12 < this.idy + this.steps && (this.direction = "up");
			this.isGo = !0;
			for (var a = 0; a < this.steps;) {
				this.moveGenMarker();
				if (!1 == this.isGo) break;
				++a
			}
			this.markersPos.push(new ha(this.idx,
				this.idy));
			"left" == this.direction && (0 == this.checkPlace(this.idx - 1, this.idy) ? this.grid[this.idx - 1][this.idy] = 2 : this.regenerate = !0);
			"right" == this.direction && (0 == this.checkPlace(this.idx + 1, this.idy) ? this.grid[this.idx + 1][this.idy] = 2 : this.regenerate = !0);
			"up" == this.direction && (0 == this.checkPlace(this.idx, this.idy - 1) ? this.grid[this.idx][this.idy - 1] = 2 : this.regenerate = !0);
			"down" == this.direction && (0 == this.checkPlace(this.idx, this.idy + 1) ? this.grid[this.idx][this.idy + 1] = 2 : this.regenerate = !0)
		},
		moveGenMarker: function() {
			"left" ==
			this.direction && (2 < this.idx - 1 && 2 > this.checkPlace(this.idx - 1, this.idy) ? (this.idx -= 1, this.grid[this.idx][this.idy] = 1, this.setDot(this.idx, this.idy)) : this.isGo = !1);
			"right" == this.direction && (9 > this.idx + 1 && 2 > this.checkPlace(this.idx + 1, this.idy) ? (this.idx += 1, this.grid[this.idx][this.idy] = 1, this.setDot(this.idx, this.idy)) : this.isGo = !1);
			"up" == this.direction && (2 < this.idy - 1 && 2 > this.checkPlace(this.idx, this.idy - 1) ? (this.idy -= 1, this.grid[this.idx][this.idy] = 1, this.setDot(this.idx, this.idy)) : this.isGo = !1);
			"down" ==
			this.direction && (12 > this.idy - 1 && 2 > this.checkPlace(this.idx, this.idy + 1) ? (this.idy += 1, this.grid[this.idx][this.idy] = 1, this.setDot(this.idx, this.idy)) : this.isGo = !1)
		},
		checkPlace: function(a, b) {
			return 0 == this.grid[a][b] ? 0 : 2 == this.grid[a][b] ? 2 : 1
		},
		setTarget: function(a, b) {
			this._target = new g(this._ctx.pack.getTexture("hackerPanel/target"));
			this.owner.addChild((new e).add(this._target));
			this.currentX = a * this.gridSize + this.deltaX;
			this.currentY = b * this.gridSize + this.deltaY;
			this._target.setXY(this.currentX * this._ctx.gameMagnify,
				this.currentY * this._ctx.gameMagnify);
			this._target.centerAnchor()
		},
		setMarker: function(a, b) {
			this._markerPos.x = (a * this.gridSize + this.deltaX) * this._ctx.gameMagnify;
			this._markerPos.y = (b * this.gridSize + this.deltaY) * this._ctx.gameMagnify;
			this._marker = new g(this._ctx.pack.getTexture("hackerPanel/marker"));
			this.owner.addChild((new e).add(this._marker));
			this._marker.setXY(this._markerPos.x, this._markerPos.y);
			this._marker.centerAnchor();
			this._markerAlpha = new g(this._ctx.pack.getTexture("hackerPanel/marker"));
			this.owner.addChild((new e).add(this._markerAlpha));
			this._markerAlpha.setXY(this._markerPos.x, this._markerPos.y);
			this._markerAlpha.centerAnchor()
		},
		setBlock: function(a, b) {
			var c = (a * this.gridSize + this.deltaX) * this._ctx.gameMagnify,
				d = (b * this.gridSize + this.deltaY) * this._ctx.gameMagnify;
			this._block1 = new g(this._ctx.pack.getTexture("hackerPanel/block"));
			this.owner.addChild((new e).add(this._block1));
			this._block1.setXY(c, d);
			this._block1.centerAnchor();
			this.blocks.push(this._block1)
		},
		setDot: function() {},
		getDirection: function(a) {
			return 0 ==
				a || 4 == a ? "left" : 1 == a || 6 == a ? "right" : 2 == a || 7 == a ? "up" : "down"
		},
		__class__: Hb
	});
	var Wc = function() {};
	f["screens.LevelButton"] = Wc;
	Wc.__name__ = ["screens", "LevelButton"];
	Wc.create = function(a, b, c, d, f, i) {
		null == i && (i = 0);
		var j = !1,
			k = new e;
		k.add(new ba(!1));
		var l;
		l = "close" == f ? new g(a.pack.getTexture("buttons/LevelBoxGray" + d)) : new g(a.pack.getTexture("buttons/LevelBox" + d));
		k.addChild((new e).add(l));
		l.setXY(b, c);
		l.centerAnchor();
		if ("close" != f) {
			f = new g(a.pack.getTexture("buttons/levelCircle"));
			k.addChild((new e).add(f));
			f.setXY(b, c - 50);
			f.centerAnchor();
			l = new g(a.pack.getTexture("buttons/LevelNumber" + d));
			k.addChild((new e).add(l));
			l.setXY(b, c - 50);
			l.centerAnchor();
			if (2 == a.levelsStatus[d - 1]) {
				var m = new g(a.pack.getTexture("buttons/LevelStar"));
				k.addChild((new e).add(m));
				m.setXY(b - 25 * a.gameMagnify, c - 25);
				m.centerAnchor();
				m = new g(a.pack.getTexture("buttons/LevelStar"));
				k.addChild((new e).add(m));
				m.setXY(b, c - 10);
				m.centerAnchor();
				m = new g(a.pack.getTexture("buttons/LevelStar"));
				k.addChild((new e).add(m));
				m.setXY(b + 25 * a.gameMagnify,
					c - 25);
				m.centerAnchor()
			}
			f.get_pointerUp().connect(function() {
				j || (j = !0, a.currentLevelNumber = d, a.batteriesInLevel = 0, a.levelTimer = 0, a.pack.getSound("sounds/button_click").play(), a.showAdGameplay(), a.isLevelPointSaved = !1)
			});
			l.get_pointerUp().connect(function() {
				j || (j = !0, a.currentLevelNumber = d, a.batteriesInLevel = 0, a.levelTimer = 0, a.pack.getSound("sounds/button_click").play(), a.showAdGameplay(), a.isLevelPointSaved = !1)
			})
		}
		1 <= i && (f = new g(a.pack.getTexture("buttons/LevelStarFull")), k.addChild((new e).add(f)),
			f.setXY(b - 25 * a.gameMagnify, c - 25), f.centerAnchor());
		2 <= i && (f = new g(a.pack.getTexture("buttons/LevelStarFull")), k.addChild((new e).add(f)), f.setXY(b, c - 10), f.centerAnchor());
		3 <= i && (i = new g(a.pack.getTexture("buttons/LevelStarFull")), k.addChild((new e).add(i)), i.setXY(b + 25 * a.gameMagnify, c - 25), i.centerAnchor());
		return k
	};
	var ad = function() {};
	f["screens.LevelMap"] = ad;
	ad.__name__ = ["screens", "LevelMap"];
	ad.create = function(a) {
		var b = new e,
			c = new m;
		b.add(c);
		var c = new e,
			d = new m;
		c.add(d);
		d = new g(a.pack.getTexture("buttons/LevelMapBack"));
		b.addChild((new e).add(d));
		d.setXY(0, 0);
		a.currentLevelPart = 1;
		a.currentLeveLSavePart = 1;
		b.addChild(c);
		d = new g(a.pack.getTexture("buttons/MapBattery"));
		d.setXY(160 * a.gameMagnify, 34 * a.gameMagnify);
		d.centerAnchor();
		b.addChild((new e).add(d));
		d = new S(a.interfaceFont);
		d.setXY(167 * a.gameMagnify, 26 * a.gameMagnify);
		d.set_text("" + a.getTotalBatteries());
		b.addChild((new e).add(d));
		for (var d = 400, f = 160 * a.gameMagnify, i = 1, j, l = 1; 11 > l;) j = l++, 1 == j && (d = 100, f = 151), 2 == j && (d = 263, f = 151), 3 == j && (d = 426, f = 151), 4 == j && (d = 590, f =
			151), 5 == j && (d = 180, f = 293), 6 == j && (d = 344, f = 293), 7 == j && (d = 508, f = 293), 8 == j && (d = 260, f = 434), 9 == j && (d = 426, f = 434), 10 == j && (d = 591, f = 434), j = 0 == a.levelsStatus[i - 1] ? Wc.create(a, d, f, i, "close") : Wc.create(a, d, f, i, "open", a.levelStars[i - 1]), c.addChild(j), i++;
		c = new g(a.pack.getTexture("buttons/Home"));
		c.setXY(100, 0.85 * k._platform.getStage().get_height() / a.gameScale);
		c.centerAnchor();
		c.get_pointerDown().connect(function() {
			a.pack.getSound("sounds/button_click").play();
			a.enterHomeScene()
		});
		b.addChild((new e).add(c));
		c =
			b._compMap.Sprite_0;
		a.isSquare ? c.setScale(a.gameScaleSquare) : c.setScale(a.gameScale);
		c.setXY(0, 0);
		return b
	};
	var Zc = function() {};
	f["screens.Mainmenu"] = Zc;
	Zc.__name__ = ["screens", "Mainmenu"];
	Zc.create = function(a) {
		var b = 0,
			c, d, f, i, j, n = new e,
			o = new m;
		n.add(o);
		o = new g(a.pack.getTexture("MainScreenBg"));
		n.addChild((new e).add(o));
		o.setXY(0, 0);
		a.isSquare ? o.setScale(a.gameScaleSquare) : o.setScale(a.gameScale);
		o = new hb(a);
		n.addChild((new e).add(o));
		o = new g(a.pack.getTexture("buttons/PlayBig"));
		o.centerAnchor().setXY(0.5 *
			k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_height());
		o.setScale(a.gameScale);
		n.addChild((new e).add(o));
		var p = new Jb(a);
		n.addChild((new e).add(p));
		a.playMenuMusic();
		i = 0;
		d = f = !1;
		c = Math.floor(100 * Math.random() + 200);
		j = 0;
		var q = new la;
		q.run(new ma(new na([new oa(0.03), new pa(function() {
			b += 1;
			b >= c && (b = 0, c = Math.floor(100 * Math.random() + 200), f = !0, p._spriteBob.rotation.set__(0), p._spriteBob.rotation.animate(p._spriteBob.rotation._value, p._spriteBob.rotation._value + 5, 0.1, l.circIn));
			if (f &&
				(i += 0.03, 0.1 <= i && (i = 0, f = !1, d = !0, 2 > j && p._spriteBob.rotation.animate(p._spriteBob.rotation._value, p._spriteBob.rotation._value - 10, 0.2, l.bounceOut), 0 == j))) {
				var g = new La(a, 0.55 * k._platform.getStage().get_width(), 0.2 * k._platform.getStage().get_height());
				n.addChild((new e).add(g))
			}
			d && (i += 0.03, 0.2 <= i && (i = 0, d = !1, p._spriteBob.rotation.set__(0), j += 1, 3 > j ? (f = !0, g = new La(a, 0.55 * k._platform.getStage().get_width(), 0.2 * k._platform.getStage().get_height()), n.addChild((new e).add(g)), 2 > j && (p._spriteBob.rotation.set__(0),
				p._spriteBob.rotation.animate(p._spriteBob.rotation._value, p._spriteBob.rotation._value + 5, 0.1, l.circIn))) : j = 0))
		})])));
		n.add(q);
		o.get_pointerDown().connect(function() {
			a.pack.getSound("sounds/button_click").play();
			a.stopMenuMusic();
			n.disposeChildren();
			if (1 == a.levelsStatus[0]) {
				var b = D.fromAssets("comics");
				k._platform.loadAssetPack(b).get(function(b) {
					a.setComicsPack(b);
					a.playComixMusic();
					b = new lc(a);
					n.addChild((new e).add(b));
					n.remove(q)
				})
			} else a.enterLevelMap()
		});
		return n
	};
	var fd = function() {};
	f["screens.NewGadget"] =
		fd;
	fd.__name__ = ["screens", "NewGadget"];
	fd.create = function(a, b) {
		var c = new e;
		c.add(new ba(!1));
		var d = new m;
		c.add(d);
		d = new g(a.pack.getTexture("screens/BackgrndGadget"));
		d.centerAnchor();
		d.setXY(0.5 * k._platform.getStage().get_width(), 0.5 * k._platform.getStage().get_height());
		var f = new g(a.pack.getTexture("screens/GadgetPlace"));
		f.setXY(0.5 * k._platform.getStage().get_width(), 0.7 * k._platform.getStage().get_height());
		f.centerAnchor();
		f.setScale(a.gameScale);
		var i = new g(a.pack.getTexture("screens/NewGadget"));
		i.setXY(0.5 * -k._platform.getStage().get_width(), 0.3 * k._platform.getStage().get_height());
		i.centerAnchor();
		i.x.animate(i.x._value, 0.5 * k._platform.getStage().get_width(), 0.3, l.linear);
		i.setScale(a.gameScale);
		var j;
		"lockpick" == b && (a.haveLockpick = !0);
		"nippers" == b && (a.haveNippers = !0);
		"hackerkit" == b && (a.haveHackerKit = !0);
		"shocker" == b && (a.haveShocker = !0);
		"setbox" == b && (a.haveBox = !0);
		j = new g(a.pack.getTexture("screens/" + b));
		j.setXY(1.5 * k._platform.getStage().get_width(), 0.7 * k._platform.getStage().get_height());
		j.centerAnchor();
		j.x.animate(j.x._value, 0.5 * k._platform.getStage().get_width(), 0.3, l.linear);
		j.setScale(a.gameScale);
		c.addChild((new e).add(d));
		c.addChild((new e).add(f));
		c.addChild((new e).add(i));
		c.addChild((new e).add(j));
		return c
	};
	var ed = function() {};
	f["screens.Note"] = ed;
	ed.__name__ = ["screens", "Note"];
	ed.create = function(a, b, c) {
		var d = new e;
		d.add(new ba(!1));
		var f = new m;
		d.add(f);
		f = new g(a.pack.getTexture("backTap"));
		d.addChild((new e).add(f));
		f.setXY(0, 0);
		f.setScale(10);
		var i = a.pack.getTexture("note"),
			i = new g(i);
		d.addChild((new e).add(i));
		i.setXY(350 * a.gameMagnify, 260 * a.gameMagnify);
		i.centerAnchor();
		b = new S(a.messagesFont, b + c);
		b.setWrapWidth(a.targetWidth).setAlign(U.Center);
		b.x.set__(5 * a.gameMagnify);
		b.y.set__(160 * a.gameMagnify);
		d.addChild((new e).add(b));
		var c = new e,
			j = m.getBounds(c),
			k = new m;
		k.x.animate(a.targetWidth, 0.5 * a.targetWidth - j.width / 2, 0.5, l.backOut);
		k.y.set__(b.y._value + b.getNaturalHeight() + 50 * a.gameMagnify);
		d.addChild(c.add(k));
		b.get_pointerDown().connect(function() {
			a.currentLevel.closeMessage()
		});
		i.get_pointerDown().connect(function() {
			a.currentLevel.closeMessage()
		});
		f.get_pointerDown().connect(function() {
			a.currentLevel.closeMessage()
		});
		f = d._compMap.Sprite_0;
		f.setScale(a.gameScale);
		f.setXY(0, a.currentLevel.ySdvigCoef);
		return d
	};
	var Ib = function(a, b, c, d) {
		this._leftKey = this._rightKey = !1;
		this._timerStop = 0.1;
		this._timer = 0;
		this._signHoleX = 1;
		this._arcOpen = this._isOpenFail = !1;
		this._padLocked = !0;
		this._tickNumber = 0;
		this.padlockActive = !0;
		this._ctx = a;
		this._doorName = b;
		this._holeX = 3 * this._ctx.gameMagnify;
		this._difLevel = c;
		this._padlockId = d
	};
	f["screens.PadlockFull"] = Ib;
	Ib.__name__ = ["screens", "PadlockFull"];
	Ib.__super__ = n;
	Ib.prototype = q(n.prototype, {
		get_name: function() {
			return "PadlockFull_20"
		},
		onAdded: function() {
			var a = this;
			this.owner.add(new m);
			var b = new g(this._ctx.pack.getTexture("backTap"));
			this.owner.addChild((new e).add(b));
			b.setXY(0, 0);
			b.setScale(10);
			var c = this._ctx.pack.getTexture("padlockElements/lockarc");
			this._lockarc = new g(c);
			this.owner.addChild((new e).add(this._lockarc));
			this._lockarc.setXY(350 *
				this._ctx.gameMagnify, 160 * this._ctx.gameMagnify);
			this._lockarc.centerAnchor();
			var c = this._ctx.pack.getTexture("padlockElements/padlockbase"),
				d = new g(c);
			this.owner.addChild((new e).add(d));
			d.setXY(350 * this._ctx.gameMagnify, 310 * this._ctx.gameMagnify);
			d.centerAnchor();
			1 == this._ctx.currentLevelNumber && (c = new g(this._ctx.pack.getTexture("tutorial/lockpickTip")), this.owner.addChild((new e).add(c)), c.setXY(10, 400));
			1 == this._difLevel && (c = this._ctx.pack.getTexture("padlockElements/lockhole"), this._hole = new g(c),
				this.owner.addChild((new e).add(this._hole)), this._hole.setXY(280 * this._ctx.gameMagnify, 328 * this._ctx.gameMagnify), this._hole.centerAnchor());
			2 == this._difLevel && (c = new g(this._ctx.pack.getTexture("padlockElements/backpack")), this.owner.addChild((new e).add(c)), c.setXY(350 * this._ctx.gameMagnify, 304 * this._ctx.gameMagnify), c.centerAnchor(), c = this._ctx.pack.getTexture("padlockElements/lockhole2"), this._hole = new g(c), this.owner.addChild((new e).add(this._hole)), this._hole.setXY(270 * this._ctx.gameMagnify,
				354 * this._ctx.gameMagnify), this._hole.centerAnchor(), c = this._ctx.pack.getTexture("padlockElements/lockhole2"), this._hole2 = new g(c), this.owner.addChild((new e).add(this._hole2)), this._hole2.setXY(400 * this._ctx.gameMagnify, 304 * this._ctx.gameMagnify), this._hole2.centerAnchor());
			c = this._ctx.pack.getTexture("padlockElements/lockpick");
			this._lockpick = new g(c);
			this.owner.addChild((new e).add(this._lockpick));
			this._lockpick.setXY(350 * this._ctx.gameMagnify, 485 * this._ctx.gameMagnify);
			this._lockpick.centerAnchor();
			this._lockspring = new g(this._ctx.pack.getTexture("padlockElements/lockclick0001"));
			this.owner.addChild((new e).add(this._lockspring));
			this._lockspring.setXY(350 * this._ctx.gameMagnify, 230 * this._ctx.gameMagnify);
			this._lockspring.centerAnchor();
			this._closeBtn = new g(this._ctx.pack.getTexture("buttons/BtnClose"));
			this.owner.addChild((new e).add(this._closeBtn));
			this._closeBtn.setXY(510 * this._ctx.gameMagnify, 140 * this._ctx.gameMagnify);
			this._closeBtn.centerAnchor();
			this._closeBtn.get_pointerDown().connect(function() {
				a._ctx.pack.getSound("sounds/button_click").play();
				a._ctx.currentLevel.closePadlock()
			});
			b.get_pointerDown().connect(function() {
				a._ctx.currentLevel.closePadlock()
			});
			d.get_pointerUp().connect(function() {
				a._leftKey = !1;
				a._rightKey = !1
			});
			b = this.owner._compMap.Sprite_0;
			b.setScale(this._ctx.gameScale);
			b.setXY(0, this._ctx.currentLevel.ySdvigCoef);
			this._isOpenFail = !1
		},
		onUpdate: function(a) {
			this.padlockActive && (this._ctx.currentLevel.leftKey && this._hole.x._value - 2 * this._ctx.gameMagnify > 270 * this._ctx.gameMagnify && this._hole.setXY(this._hole.x._value - 2 * this._ctx.gameMagnify,
				this._hole.y._value), this._ctx.currentLevel.rightKey && this._hole.x._value + 2 * this._ctx.gameMagnify < 430 * this._ctx.gameMagnify && this._hole.setXY(this._hole.x._value + 2 * this._ctx.gameMagnify, this._hole.y._value), this._ctx.currentLevel.actionKey && (Math.abs(this._lockpick.x._value - this._hole.x._value) < 10 * this._ctx.gameMagnify ? (this._ctx.currentLevel.actionKey = !1, 1 == this._difLevel && (this._hole.x.set__(this._lockpick.x._value), this._padLocked = this.padlockActive = !1, this._timerStop = 0.2, this._timer = 0, this._lockpick.y.animate(this._lockpick.y._value,
				330 * this._ctx.gameMagnify, 0.5, l.backOut)), 2 == this._difLevel && 0 == this._tickNumber ? (this._tickNumber = 1, this._hole.x.set__(this._lockpick.x._value), this._hole = this._hole2, this._hole.x.set__(this._lockpick.x._value), this._lockpick.y.animate(this._lockpick.y._value, 440 * this._ctx.gameMagnify, 0.5, l.backOut)) : 2 == this._difLevel && 1 == this._tickNumber && (this.padlockActive = !1, this._tickNumber = 2, this._padLocked = !1, this._timerStop = 0.2, this._timer = 0, this._lockpick.y.animate(this._lockpick.y._value, 335 * this._ctx.gameMagnify,
				0.5, l.backOut)), this._ctx.pack.getSound("sounds/lock_unlocked").play()) : (this.padlockActive = !1, this._isOpenFail = !0, this._timer = 0, this._timerStop = 0.1, this._lockpick.y.animate(this._lockpick.y._value, 470 * this._ctx.gameMagnify, 0.5, l.backOut), this._ctx.pack.getSound("sounds/lock_error").play())));
			this._padLocked && (this._timer += a, 0 < this._signHoleX ? this._hole.x._value + this._holeX < 420 * this._ctx.gameMagnify && this._hole.x.animate(this._hole.x._value, this._hole.x._value + this._holeX, 0.5, l.backOut) : this._hole.x._value -
				this._holeX > 260 * this._ctx.gameMagnify && this._hole.x.animate(this._hole.x._value, this._hole.x._value - this._holeX, 0.5, l.backOut), this._timer >= this._timerStop && (this._timer = 0, this._timerStop = 1, this._signHoleX *= -1, this._holeX = Math.random() + 6 * this._ctx.gameMagnify));
			this._isOpenFail ? (this._timer += a, this._timer >= this._timerStop && this._ctx.currentLevel.closePadlock()) : (!this._padLocked && !this._arcOpen && (this._timer += a, this._timer >= this._timerStop && (this._arcOpen = !0, this._timerStop = 0.5, this._timer = 0, this._lockarc.y.animate(this._lockarc.y._value,
				50 * this._ctx.gameMagnify, 0.5, l.backOut), this._lockspring.texture = this._ctx.pack.getTexture("padlockElements/lockclick0002"))), this._arcOpen && (this._timer += a, this._timer >= this._timerStop && (this._ctx.addObjectsToSave(new Q(this._padlockId)), this._ctx.currentLevel.closePadlock(), this._ctx.currentLevel.FindAndOpenDoor(this._doorName), this._ctx.currentLevel._charactersLayer.removeChild(this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon), this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon.dispose(),
				this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock.disposeChildren(), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock.dispose(), this._ctx.currentLevel.player._compMap.BobHero_33.currentPadlock = null)))
		},
		__class__: Ib
	});
	var bd = function() {};
	f["screens.Pausemenu"] = bd;
	bd.__name__ = ["screens", "Pausemenu"];
	bd.create = function(a, b, c) {
		b = new e;
		b.add(new ba(!1));
		var d = new m;
		b.add(d);
		d = new fa(0, a.targetWidth * a.gameMagnify, a.targetHeight * a.gameMagnify);
		d.alpha.animate(0, 0.5, 0.5);
		b.addChild((new e).add(d));
		d.centerAnchor();
		d.setXY(0.5 * a.targetWidth, 0.5 * a.targetHeight);
		d = new g(a.pack.getTexture("screens/Paused"));
		d.setXY(0.5 * a.targetWidth, 170 * a.gameMagnify);
		d.centerAnchor();
		b.addChild((new e).add(d));
		for (var d = new e, f = 0, i = 0; i < c.length;) {
			var j = c[i++],
				k = [c[i++]],
				j = new g(a.pack.getTexture("buttons/" + j));
			j.setXY(f, 300 * a.gameMagnify);
			j.get_pointerDown().connect(function(b) {
				return function() {
					a.pack.getSound("sounds/button_click").play();
					b[0]()
				}
			}(k));
			f += j.getNaturalWidth() + 20 * a.gameMagnify;
			d.addChild((new e).add(j))
		}
		c =
			m.getBounds(d);
		f = new m;
		f.x.animate(a.targetWidth, 0.5 * a.targetWidth - c.width / 2, 0.5, l.backOut);
		b.addChild(d.add(f));
		c = b._compMap.Sprite_0;
		c.setScale(a.gameScale);
		c.setXY(a.centerCoefX, a.centerCoefY);
		return b
	};
	var hd = function() {};
	f["screens.Preloader"] = hd;
	hd.__name__ = ["screens", "Preloader"];
	hd.create = function(a) {
		var b = new e,
			c = k._platform.getStage().get_width() / 640,
			d = k._platform.getStage().get_height() / 960,
			f = Math.min(c, d),
			c = Math.max(c, d),
			d = new g(a.getTexture("progress/MainScreenBg"));
		b.addChild((new e).add(d));
		d.setXY(0, 0);
		1.5 < k._platform.getStage().get_height() / k._platform.getStage().get_width() ? d.setScale(f) : d.setScale(c);
		c = new g(a.getTexture("progress/gameLogo"));
		b.addChild((new e).add(c));
		c.setXY(0.5 * k._platform.getStage().get_width(), 0.2 * k._platform.getStage().get_height());
		c.setScale(f);
		c.centerAnchor();
		var i = new g(a.getTexture("progress/Left")),
			c = new g(a.getTexture("progress/Right")),
			j = k._platform.getStage().get_width() - i.texture.get_width() - c.texture.get_width() - 40,
			d = 0.5 * k._platform.getStage().get_height() +
			i.texture.get_height();
		i.setXY(20, d);
		b.addChild((new e).add(i));
		var l = new Wa(a.getTexture("progress/Background"), j);
		l.setXY(i.x._value + i.texture.get_width(), d);
		b.addChild((new e).add(l));
		var m = new Wa(a.getTexture("progress/Fill"));
		m.setXY(l.x._value, d);
		var n = 0,
			i = new la;
		i.run(new ma(new na([new oa(0.01), new pa(function() {
			100 > n ? m.width.set__(n / 100 * j) : m.width.set__(j);
			n += 2
		})])));
		b.add(i);
		b.addChild((new e).add(m));
		c.setXY(m.x._value + j, d);
		b.addChild((new e).add(c));
		a = new S(new R(a, "fonts/Interface"));
		a.setXY(10 * f, 10 * f);
		a.set_text("1.0.0");
		b.addChild((new e).add(a));
		return b
	};
	var fb = function(a) {
		this._wBlock = null;
		this.signalType = 3;
		this._ctx = a;
		this.scene = new e;
		this.scene.add(new ba(!1))
	};
	f["screens.SignalEnd"] = fb;
	fb.__name__ = ["screens", "SignalEnd"];
	fb.prototype = {
		setupBlock: function(a, b, c) {
			0 != b && (this._blockX = b);
			0 != c && (this._blockY = c);
			null != this._wBlock && (this.scene.removeChild(this._wBlock), this._wBlock.dispose(), this._wBlock = null);
			b = this._ctx.pack.getTexture("wiresPanel/wireSignalEnd000" + a);
			b = new g(b);
			this._wBlock = (new e).add(b);
			this.scene.addChild(this._wBlock);
			b.setXY(this._blockX, this._blockY);
			this.signalType = a
		},
		__class__: fb
	};
	var qa = function(a) {
		this._timerStop = 7.2;
		this._timer = 0;
		this._currentSprite = 1;
		this.tipsActivate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this._ctx = a
	};
	f["screens.Tutorial"] = qa;
	qa.__name__ = ["screens", "Tutorial"];
	qa.__super__ = n;
	qa.prototype = q(n.prototype, {
		get_name: function() {
			return "Tutorial_24"
		},
		onAdded: function() {
			this.owner.add(new m);
			this.picture1 = new g(this._ctx.pack.getTexture("tutorial/tip1"));
			this.owner.addChild((new e).add(this.picture1));
			this.picture1.setXY(260, 80);
			this.picture1.alpha.set__(0);
			this.picture1.set_pointerEnabled(!1);
			this.picture2 = new g(this._ctx.pack.getTexture("tutorial/tip2"));
			this.owner.addChild((new e).add(this.picture2));
			this.picture2.setXY(480, 80);
			this.picture2.alpha.set__(0);
			this.picture2.set_pointerEnabled(!1);
			this.picture3 = new g(this._ctx.pack.getTexture("tutorial/tip3"));
			this.owner.addChild((new e).add(this.picture3));
			this.picture3.alpha.set__(0);
			this.picture3.set_pointerEnabled(!1);
			this.picture6 = new g(this._ctx.pack.getTexture("tutorial/tip6"));
			this.owner.addChild((new e).add(this.picture6));
			this.picture6.setXY(230, 350);
			this.picture6.alpha.set__(0);
			this.picture6.set_pointerEnabled(!1);
			var a = this.owner._compMap.Sprite_0;
			a.setScale(this._ctx.gameScale);
			a.setXY(0, 50 * this._ctx.currentScaleCoef);
			this._currentSprite = 1;
			this._timer = this._timerStop;
			this._ctx.isLevelPointSaved && (this.tipsActivate[0] = 2, this.tipsActivate[1] = 2, this.tipsActivate[2] = 2, this.tipsActivate[3] = 2)
		},
		onUpdate: function() {},
		showTip: function(a, b) {
			null == b && (b = "box");
			this._ctx.isLevelPointSaved || (this._currentSprite = a, 0 == this.tipsActivate[this._currentSprite - 1] && (this._timer = 0, this.tipsActivate[this._currentSprite - 1] = 1, 1 == a && this.picture1.alpha.animate(0, 1, 0.4, l.backIn), 2 == a && this.picture2.alpha.animate(0, 1, 0.4, l.backIn), 3 == a && ("box" == b ? (this.picture3.setXY(450, 180), 0 == this.tipsActivate[3] && (this.picture4 = new g(this._ctx.pack.getTexture("tutorial/tip4")), this.owner.addChild((new e).add(this.picture4)), this.picture4.setXY(20,
					180), this.picture4.alpha.set__(0), this.picture4.alpha.animate(0, 1, 0.4, l.backIn), this.picture4.set_pointerEnabled(!1), this.tipsActivate[3] = 1), this.tipsActivate[3] = 1) : this.picture3.setXY(200, 80), this.picture3.alpha.animate(0, 1, 0.4, l.backIn)), 5 == a && (this.picture5 = new g(this._ctx.pack.getTexture("tutorial/tip5")), this.owner.addChild((new e).add(this.picture5)), this.picture5.setXY(150, 280), this.picture5.alpha.set__(0), this.picture5.alpha.animate(0, 1, 0.4, l.backIn), this.picture5.set_pointerEnabled(!1)),
				6 == a && this.picture6.alpha.animate(0, 1, 0.4, l.backIn), 7 == a && (this.picture7 = new g(this._ctx.pack.getTexture("tutorial/tip7")), this.owner.addChild((new e).add(this.picture7)), this.picture7.setXY(130, 280), this.picture7.alpha.set__(0), this.picture7.alpha.animate(0, 1, 0.4, l.backIn), this.picture7.set_pointerEnabled(!1)), 8 == a && (this.picture8 = new g(this._ctx.pack.getTexture("tutorial/tip8")), this.owner.addChild((new e).add(this.picture8)), this.picture8.setXY(320, 80), this.picture8.alpha.set__(0), this.picture8.alpha.animate(0,
					1, 0.4, l.backIn), this.picture8.set_pointerEnabled(!1)), 9 == a && (this.picture9 = new g(this._ctx.pack.getTexture("tutorial/tip9")), this.owner.addChild((new e).add(this.picture9)), this.picture9.setXY(20, 180), this.picture9.alpha.set__(0), this.picture9.alpha.animate(0, 1, 0.4, l.backIn), this.picture9.set_pointerEnabled(!1)), 10 == a && (this.picture10 = new g(this._ctx.pack.getTexture("tutorial/tip10")), this.owner.addChild((new e).add(this.picture10)), this.picture10.setXY(20, 80), this.picture10.alpha.set__(0), this.picture10.alpha.animate(0,
					1, 0.4, l.backIn), this.picture10.set_pointerEnabled(!1))))
		},
		closeTip: function(a) {
			this._ctx.isLevelPointSaved || (this._currentSprite = a, this._timer = 0, this.tipsActivate[this._currentSprite - 1] = 2, 1 == this._currentSprite && this.owner.removeChild(this.picture1.owner), 2 == this._currentSprite && this.picture2.alpha.set__(0), 3 == this._currentSprite && this.picture3.alpha.set__(0), 4 == this._currentSprite && this.owner.removeChild(this.picture4.owner), 5 == this._currentSprite && this.owner.removeChild(this.picture5.owner), 6 ==
				this._currentSprite && this.picture6.alpha.set__(0), 6 == a && 0 == this.tipsActivate[6] && this.showTip(7));
			7 == a && null != this.picture7 && this.owner.removeChild(this.picture7.owner);
			8 == a ? this.owner.removeChild(this.picture8.owner) : 9 == a ? this.owner.removeChild(this.picture9.owner) : 10 == a && this.owner.removeChild(this.picture10.owner)
		},
		__class__: qa
	});
	var Xc = function(a, b, c) {
		this._wBlock = null;
		this.wireType = 9;
		this.stepCount = 0;
		this._ctx = a;
		this.scene = new e;
		this.scene.add(new ba(!1));
		this._blockX = b;
		this._blockY = c
	};
	f["screens.WireBlock"] =
		Xc;
	Xc.__name__ = ["screens", "WireBlock"];
	Xc.prototype = {
		resetBlock: function() {
			this.stepCount = 0;
			this.wireType = 9
		},
		getX: function() {
			return this._blockX
		},
		getY: function() {
			return this._blockY
		},
		setupBlock: function(a) {
			null != this._wBlock && (this.scene.removeChild(this._wBlock), this._wBlock.dispose(), this._wBlock = null);
			var b = this._ctx.pack.getTexture("wiresPanel/wires000" + a),
				b = new g(b);
			this._wBlock = (new e).add(b);
			this.scene.addChild(this._wBlock);
			b.setXY(this._blockX, this._blockY);
			this.wireType = a;
			this.stepCount++
		},
		__class__: Xc
	};
	var ub = function(a) {
		this.pulseTimer = this.milliSecTimer = 0;
		this._qElementsMenu = 3;
		this._currentElement = 1;
		this._wireIsCut = this._properWire = !1;
		this._alertStartTimer = 0;
		this._wasOpen = !1;
		this._timerStop = 1.2;
		this._timer = 0;
		this._currentWire = "green";
		this.wireLengthArray = [0, 0, 0];
		this.padlockActive = !0;
		this._ctx = a;
		this.pulse = !1
	};
	f["screens.WiresPanel"] = ub;
	ub.__name__ = ["screens", "WiresPanel"];
	ub.__super__ = n;
	ub.prototype = q(n.prototype, {
		get_name: function() {
			return "WiresPanel_21"
		},
		onAdded: function() {
			var a =
				this;
			this.owner.add(new m);
			var b = new g(this._ctx.pack.getTexture("backTap"));
			this.owner.addChild((new e).add(b));
			b.setXY(0, 0);
			b.setScale(10);
			var c = this._ctx.pack.getTexture("wiresPanel/wirespanel"),
				d = new g(c);
			this.owner.addChild((new e).add(d));
			d.setXY(350 * this._ctx.gameMagnify, 260 * this._ctx.gameMagnify);
			d.centerAnchor();
			3 == this._ctx.currentLevelNumber && (d = new g(this._ctx.pack.getTexture("tutorial/wireTip")), this.owner.addChild((new e).add(d)), d.setXY(10, 400));
			this._spark = new ea(this._ctx, 0, 0);
			this.owner.addChild((new e).add(this._spark));
			c = this._ctx.pack.getTexture("wiresPanel/wiregreen0001");
			this.wgreen = new g(c);
			this.owner.addChild((new e).add(this.wgreen));
			this.wgreen.setXY(298 * this._ctx.gameMagnify, 380 * this._ctx.gameMagnify);
			this.wgreen.centerAnchor();
			c = this._ctx.pack.getTexture("wiresPanel/wireblue0001");
			this.wblue = new g(c);
			this.owner.addChild((new e).add(this.wblue));
			this.wblue.setXY(354 * this._ctx.gameMagnify, 380 * this._ctx.gameMagnify);
			this.wblue.centerAnchor();
			c = this._ctx.pack.getTexture("wiresPanel/wireorange0001");
			this.worange =
				new g(c);
			this.owner.addChild((new e).add(this.worange));
			this.worange.setXY(410 * this._ctx.gameMagnify, 380 * this._ctx.gameMagnify);
			this.worange.centerAnchor();
			c = this._ctx.pack.getTexture("wiresPanel/nippersOpen");
			this._nippers = new g(c);
			this.owner.addChild((new e).add(this._nippers));
			this._nippers.setXY(30 * this._ctx.gameMagnify, 390 * this._ctx.gameMagnify);
			this._nippers.centerAnchor();
			this._closeBtn = new g(this._ctx.pack.getTexture("buttons/BtnClose"));
			this.owner.addChild((new e).add(this._closeBtn));
			this._closeBtn.setXY(500 *
				this._ctx.gameMagnify, 90 * this._ctx.gameMagnify);
			this._closeBtn.centerAnchor();
			this._nippers.get_pointerDown().connect(function() {
				c = a._ctx.pack.getTexture("wiresPanel/nippersClose");
				a._nippers.texture = c;
				1 == a._currentElement && (a.wgreen.texture = a._ctx.pack.getTexture("wiresPanel/wiregreen0002"));
				2 == a._currentElement && (a.wblue.texture = a._ctx.pack.getTexture("wiresPanel/wireblue0002"));
				3 == a._currentElement && (a.worange.texture = a._ctx.pack.getTexture("wiresPanel/wireorange0002"));
				a.currentWireToCut == a._currentElement &&
					(a._properWire = !0);
				a._wireIsCut = !0;
				a._ctx.pack.getSound("sounds/nippers_cut").play();
				a._spark.changeAction("_Spark");
				a._spark.setCoor(a._nippers.x._value + 55 * a._ctx.gameMagnify, a._nippers.y._value - 30 * a._ctx.gameMagnify)
			});
			this.wgreen.get_pointerDown().connect(function() {
				a._currentElement = 1;
				a.sortElements();
				a._ctx.pack.getSound("sounds/nippers_move").play()
			});
			this.wblue.get_pointerDown().connect(function() {
				a._currentElement = 2;
				a.sortElements();
				a._ctx.pack.getSound("sounds/nippers_move").play()
			});
			this.worange.get_pointerDown().connect(function() {
				a._currentElement =
					3;
				a.sortElements();
				a._ctx.pack.getSound("sounds/nippers_move").play()
			});
			this._timeLabel = new S(this._ctx.interfaceFont2);
			this._timeLabel.setXY(0.5 * this._ctx.targetWidth, 80);
			this._timeLabel.set_text(this._seconds + ":99");
			this._timeLabel.centerAnchor();
			this._timeLabel.setScale(0.8);
			this._mseconds = 99;
			this.owner.addChild((new e).add(this._timeLabel));
			this._wires = [];
			this._signalsEnd = [];
			this.setUpWires();
			this._currentWire = "green";
			this._closeBtn.get_pointerDown().connect(function() {
				a._ctx.pack.getSound("sounds/button_click").play();
				a._wasOpen = !1;
				a._ctx.currentLevel.closeWiresPanel(!1)
			});
			b.get_pointerDown().connect(function() {
				a._wasOpen = !1;
				a._ctx.currentLevel.closeWiresPanel(!1)
			});
			this.sortElements();
			b = this.owner._compMap.Sprite_0;
			b.setScale(this._ctx.gameScale);
			b.setXY(0, this._ctx.currentLevel.ySdvigCoef)
		},
		onUpdate: function(a) {
			this.padlockActive && (this._ctx.currentLevel.leftKey && (this._ctx.currentLevel.leftKey = !1, this._currentElement -= 1, 1 > this._currentElement && (this._currentElement = 3), this.sortElements(), this._ctx.pack.getSound("sounds/nippers_move").play()),
				this._ctx.currentLevel.rightKey && (this._ctx.currentLevel.rightKey = !1, this._currentElement += 1, this._currentElement > this._qElementsMenu && (this._currentElement = 1), this.sortElements(), this._ctx.pack.getSound("sounds/nippers_move").play()), this._ctx.currentLevel.actionKey && (this.padlockActive = !1, this._ctx.currentLevel.actionKey = !1, this._nippers.texture = this._ctx.pack.getTexture("wiresPanel/nippersClose"), 1 == this._currentElement && (this.wgreen.texture = this._ctx.pack.getTexture("wiresPanel/wiregreen0002")),
					2 == this._currentElement && (this.wblue.texture = this._ctx.pack.getTexture("wiresPanel/wireblue0002")), 3 == this._currentElement && (this.worange.texture = this._ctx.pack.getTexture("wiresPanel/wireorange0002")), this.currentWireToCut == this._currentElement && (this._properWire = !0), this._wireIsCut = !0, this._ctx.pack.getSound("sounds/nippers_cut").play(), this._spark.changeAction("_Spark"), this._spark.setCoor(this._nippers.x._value + 55 * this._ctx.gameMagnify, this._nippers.y._value - 30 * this._ctx.gameMagnify)));
			this.pulse &&
				(this.pulseTimer += a, 0.2 <= this.pulseTimer && (this._timeLabel.scaleX.animate(1, 0.8, 0.2, l.sineOut), this._timeLabel.scaleY.animate(1, 0.8, 0.2, l.sineOut), this.pulse = !1, this.pulseTimer = 0));
			this._wasOpen && !this._wireIsCut && (this._alertStartTimer += a, this.milliSecTimer += a, 0.01 < this.milliSecTimer && (this.milliSecTimer = 0, this._mseconds -= 1), 0 > this._mseconds && (this._mseconds = 0));
			9 < this._seconds ? 9 < this._mseconds ? this._timeLabel.set_text(this._seconds + ":" + this._mseconds) : this._timeLabel.set_text(this._seconds + ":0" +
				this._mseconds) : 9 < this._mseconds ? this._timeLabel.set_text("0" + this._seconds + ":" + this._mseconds) : this._timeLabel.set_text("0" + this._seconds + ":0" + this._mseconds);
			1 <= this._alertStartTimer && (this._alertStartTimer = 0, this._seconds -= 1, this._mseconds = 99, this._timeLabel.scaleX.animate(0.8, 1, 0.2, l.sineOut), this._timeLabel.scaleY.animate(0.8, 1, 0.2, l.sineOut), this.pulse = !0, -1 >= this._seconds && (this._timeLabel.set_text("00:00"), this._ctx.currentLevel._charactersLayer.removeChild(this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon),
				this._wasOpen = !1, this._ctx.currentLevel.closeWiresPanel(!0), this._ctx.currentLevel.gameOver()));
			this._wireIsCut && (this._timer += a, 0.4 <= this._timer && this._spark.stopAction(), this._timer >= this._timerStop && (this._properWire ? (this._ctx.currentLevel.FindAndDeactivateObject(this._objectName), this._wasOpen = !1, this._ctx.currentLevel.closeWiresPanel(!0)) : (this._wasOpen = !1, this._ctx.currentLevel.closeWiresPanel(!0), this._ctx.currentLevel._charactersLayer.removeChild(this._ctx.currentLevel.player._compMap.BobHero_33.currentBalloon),
				this._ctx.currentLevel.gameOver())))
		},
		setUpWires: function() {
			var a, b = Math.round(252 * this._ctx.gameMagnify),
				c = Math.round(132 * this._ctx.gameMagnify);
			this._signalsEnd.push(new fb(this._ctx));
			this._signalsEnd.push(new fb(this._ctx));
			this._signalsEnd.push(new fb(this._ctx));
			this.wireBlocks = this.crossCount = this.changeWireCount = this._signalsStand = 0;
			this.wireLengthArray[0] = 0;
			this.wireLengthArray[1] = 0;
			for (var d = this.wireLengthArray[2] = 0; 8 > d;) {
				d++;
				this._panelsWires = [];
				for (var e = 0; 8 > e;) e++, a = new Xc(this._ctx,
					b, c), this._panelsWires.push(a), b += Math.round(28 * this._ctx.gameMagnify);
				this._wires.push(this._panelsWires);
				b = Math.round(252 * this._ctx.gameMagnify);
				c += Math.round(28 * this._ctx.gameMagnify)
			}
			this.circleCount = this.wireCount = 1;
			this.curDirection = 2;
			this.prevPosition = this.curPosition = new ha(1, 7);
			this._wires[this.curPosition.y][this.curPosition.x].setupBlock(8);
			this.owner.addChild(this._wires[this.curPosition.y][this.curPosition.x].scene);
			this._wires[7][3].setupBlock(8);
			this.owner.addChild(this._wires[7][3].scene);
			this._wires[7][5].setupBlock(8);
			this.owner.addChild(this._wires[7][5].scene);
			for (this.curPosition.y -= 1; 4 > this.wireCount && 30 > this.changeWireCount;) this.addWireBlock();
			this.buildWireAgain()
		},
		constructWires: function() {
			for (var a = this._signalsStand = 0; 8 > a;)
				for (var b = a++, c = 0; 8 > c;) {
					var d = c++;
					this.owner.removeChild(this._wires[d][b].scene);
					this._wires[d][b].resetBlock()
				}
			this.owner.removeChild(this._signalsEnd[0].scene);
			this.owner.removeChild(this._signalsEnd[1].scene);
			this.owner.removeChild(this._signalsEnd[2].scene);
			this.wireBlocks = this.crossCount = this.changeWireCount = 0;
			this.wireLengthArray[0] = 0;
			this.wireLengthArray[1] = 0;
			this.wireLengthArray[2] = 0;
			this.circleCount = this.wireCount = 1;
			this.curDirection = 2;
			this.prevPosition = this.curPosition = new ha(1, 7);
			this._wires[this.curPosition.y][this.curPosition.x].setupBlock(8);
			this.owner.addChild(this._wires[this.curPosition.y][this.curPosition.x].scene);
			this._wires[7][3].setupBlock(8);
			this.owner.addChild(this._wires[7][3].scene);
			this._wires[7][5].setupBlock(8);
			this.owner.addChild(this._wires[7][5].scene);
			for (this.curPosition.y -= 1; 4 > this.wireCount && 40 > this.changeWireCount;) this.addWireBlock();
			this.buildWireAgain()
		},
		buildWireAgain: function() {
			if (4 > this.wireCount || 4 > this.crossCount || 36 > this.wireBlocks) this.constructWires();
			else {
				var a = this.wireLengthArray[0],
					b = 0;
				this.wireLengthArray[1] > a && (a = this.wireLengthArray[1], b = 1);
				this.wireLengthArray[2] > a && (b = 2);
				this.currentWireToCut = b + 1;
				this._signalsEnd[b].setupBlock(2, 0, 0)
			}
		},
		addWireBlock: function() {
			var a = Math.floor(8 * Math.random() + 1);
			this.changeWireCount++;
			0 ==
				this.curPosition.y && (1 == this.curDirection && (a = 4), 2 == this.curDirection && (a = 8), 3 == this.curDirection && (a = 3), this._wires[this.curPosition.y][this.curPosition.x].setupBlock(a), this.owner.addChild(this._wires[this.curPosition.y][this.curPosition.x].scene), this._signalsEnd[this._signalsStand].setupBlock(1, this._wires[this.curPosition.y][this.curPosition.x].getX(), this._wires[this.curPosition.y][this.curPosition.x].getY() - 18), this.owner.addChild(this._signalsEnd[this._signalsStand].scene), this._signalsStand +=
					1, this.wireCount++, 2 == this.wireCount && (this.circleCount = Math.floor(2 * Math.random() + 1), 1 > this.circleCount && (this.circleCount = 1), this.curDirection = 2, this.curPosition = new ha(3, 7), this.curPosition.y -= 1), 3 == this.wireCount && (this.circleCount = Math.floor(2 * Math.random() + 1), 1 > this.circleCount && (this.circleCount = 1), this.curDirection = 2, this.curPosition = new ha(5, 7), this.curPosition.y -= 1));
			this.isValidWireSegment(this.curPosition, this.prevPosition, this.curDirection, a) && (this._wires[this.curPosition.y][this.curPosition.x].setupBlock(a),
				this.owner.addChild(this._wires[this.curPosition.y][this.curPosition.x].scene), this.changeWireCount = 0, this.wireBlocks++, 1 == this.wireCount && (this.wireLengthArray[0] += 1), 2 == this.wireCount && (this.wireLengthArray[1] += 1), 3 == this.wireCount && (this.wireLengthArray[2] += 1), (5 == a || 6 == a) && this.crossCount++, 1 == a && (2 == this.curDirection && (this.curDirection = 3), 1 == this.curDirection && (this.curDirection = 4)), 2 == a && (2 == this.curDirection && (this.curDirection = 1), 3 == this.curDirection && (this.curDirection = 4)), 3 == a && (4 == this.curDirection &&
					(this.curDirection = 1), 3 == this.curDirection && (this.curDirection = 2)), 4 == a && (4 == this.curDirection && (this.curDirection = 3), 1 == this.curDirection && (this.curDirection = 2)), 2 == this.curDirection && (this.curPosition.y -= 1), 4 == this.curDirection && (this.curPosition.y += 1, this.circleCount++), 1 == this.curDirection && (this.curPosition.x -= 1), 3 == this.curDirection && (this.curPosition.x += 1))
		},
		setName: function(a, b) {
			this._objectName = a;
			this._seconds = b - 1;
			this._wasOpen = !0;
			this._alertStartTimer = 0
		},
		sortElements: function() {
			1 == this._currentElement &&
				(this._nippers.setXY(this.wgreen.x._value - 40 * this._ctx.gameMagnify, this.wgreen.y._value + 30 * this._ctx.gameMagnify), this._currentWire = "green");
			2 == this._currentElement && (this._nippers.setXY(this.wblue.x._value - 40 * this._ctx.gameMagnify, this.wblue.y._value + 30 * this._ctx.gameMagnify), this._currentWire = "blue");
			3 == this._currentElement && (this._nippers.setXY(this.worange.x._value - 40 * this._ctx.gameMagnify, this.worange.y._value + 30 * this._ctx.gameMagnify), this._currentWire = "orange")
		},
		isValidWireSegment: function(a,
			b, c, d) {
			if (1 == d && (3 == c || 4 == c || 0 < this._wires[this.curPosition.y][this.curPosition.x].stepCount || 2 == c && 6 == a.x || 1 == c && 6 == a.y || 1 == c && (1 < this.circleCount || 3 == a.x || 5 == a.x) || 2 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x + 1].wireType || 1 == c && 7 > this._wires[this.curPosition.y + 1][this.curPosition.x].wireType) || 2 == d && (1 == c || 4 == c || 0 < this._wires[this.curPosition.y][this.curPosition.x].stepCount || 2 == c && 0 == a.x || 3 == c && 6 == a.y || 3 == c && (1 < this.circleCount || 3 == a.x || 5 == a.x) || 2 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x -
					1
				].wireType || 3 == c && 7 > this._wires[this.curPosition.y + 1][this.curPosition.x].wireType) || 3 == d && (1 == c || 2 == c || 0 < this._wires[this.curPosition.y][this.curPosition.x].stepCount || 4 == c && 0 == a.x || 3 == c && 0 == a.y || 4 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x - 1].wireType || 3 == c && 7 > this._wires[this.curPosition.y - 1][this.curPosition.x].wireType) || 4 == d && (3 == c || 2 == c || 0 < this._wires[this.curPosition.y][this.curPosition.x].stepCount || 4 == c && 6 == a.x || 1 == c && 0 == a.y || 4 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x +
					1
				].wireType || 1 == c && 7 > this._wires[this.curPosition.y - 1][this.curPosition.x].wireType)) return !1;
			if (5 == d || 8 == d)
				if (1 == c || 3 == c || 1 == this._wires[this.curPosition.y][this.curPosition.x].stepCount && 8 == d || 0 == this._wires[this.curPosition.y][this.curPosition.x].stepCount && 5 == d || 2 == c && 0 == a.y || 4 == c && 6 == a.y || 2 == c && 7 > this._wires[this.curPosition.y - 1][this.curPosition.x].wireType || 4 == c && 7 > this._wires[this.curPosition.y + 1][this.curPosition.x].wireType) return !1;
			if (6 == d || 7 == d)
				if (2 == c || 4 == c || 1 == this._wires[this.curPosition.y][this.curPosition.x].stepCount &&
					7 == d || 0 == this._wires[this.curPosition.y][this.curPosition.x].stepCount && 6 == d || 1 == c && 0 == a.x || 3 == c && 6 == a.x || 1 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x - 1].wireType || 3 == c && 8 > this._wires[this.curPosition.y][this.curPosition.x + 1].wireType) return !1;
			return !0
		},
		__class__: ub
	});
	var nc = function() {
		this._url = k._platform.getExternal().call("location.href.toString");
		this.checkUrl = this._url.split("/")[2]
	};
	f["system.SiteLock"] = nc;
	nc.__name__ = ["system", "SiteLock"];
	nc.prototype = {
		__class__: nc
	};
	var sd = 0;
	Math.NaN = Number.NaN;
	Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
	Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	f.Math = Math;
	Math.isFinite = function(a) {
		return isFinite(a)
	};
	Math.isNaN = function(a) {
		return isNaN(a)
	};
	String.prototype.__class__ = f.String = String;
	String.__name__ = ["String"];
	f.Array = Array;
	Array.__name__ = ["Array"];
	Date.prototype.__class__ = f.Date = Date;
	Date.__name__ = ["Date"];
	var td = f.Int = {
			__name__: ["Int"]
		},
		ud = f.Dynamic = {
			__name__: ["Dynamic"]
		},
		qd = f.Float = Number;
	qd.__name__ = ["Float"];
	var rd = f.Bool =
		Boolean;
	rd.__ename__ = ["Bool"];
	var vd = f.Class = {
			__name__: ["Class"]
		},
		wd = {};
	p.Element = "element";
	p.PCData = "pcdata";
	p.CData = "cdata";
	p.Comment = "comment";
	p.DocType = "doctype";
	p.ProcessingInstruction = "processingInstruction";
	p.Document = "document";
	da.instance = new da;
	G.DISPATCHING_SENTINEL = new Ca(null, null);
	k.root = new e;
	k.uncaughtError = new x;
	k.hidden = new z(!1);
	k.volume = new y(1);
	k._platform = da.instance;
	k._calledInit = !1;
	D.__meta__ = {
		obj: {
			assets: [{
				preloader: [{
						bytes: 1352,
						md5: "823292d544b5ea6b41ed2f127bb5ee91",
						name: "fonts/Interface.fnt"
					},
					{
						bytes: 3196,
						md5: "777b6c7c56733764aa79dad73e29a318",
						name: "fonts/Interface.png"
					}, {
						bytes: 239,
						md5: "43867ffe2ed963a3dc415633a74873ef",
						name: "progress/Background.png"
					}, {
						bytes: 238,
						md5: "0b8fc57138a8f80221daf7fb3114669a",
						name: "progress/Fill.png"
					}, {
						bytes: 1605,
						md5: "11d0633df19b92822625424b83192b53",
						name: "progress/Left.png"
					}, {
						bytes: 92790,
						md5: "f599db73d67d217457ff1aaa948774e0",
						name: "progress/MainScreenBg.png"
					}, {
						bytes: 1621,
						md5: "af8723cd197ddf8ec53ea06b9b54b035",
						name: "progress/Right.png"
					}, {
						bytes: 18864,
						md5: "18a7b41e469f845124a360da2e809587",
						name: "progress/gameLogo.png"
					}
				],
				locale: [{
					bytes: 63,
					md5: "704272e6583fe1f162c9b209fb2942c2",
					name: "messages.ini"
				}],
				finalcomics: [{
					bytes: 22377,
					md5: "4aac42c0c797f53f4541963819b35f8d",
					name: "finpic1.png"
				}, {
					bytes: 14844,
					md5: "42ddff2e9434e13c5c214e2ef9617a4e",
					name: "finpic2.png"
				}, {
					bytes: 12420,
					md5: "ff69e4fa1d0aad8f8b7a0d172ad085fd",
					name: "finpic3.png"
				}, {
					bytes: 23685,
					md5: "036bc3670d4000188dcb48bbb742bc35",
					name: "finpic4.png"
				}],
				main: [{
						bytes: 5500,
						md5: "8f06d2287f7a0f20ca110a0ef1d43935",
						name: "BalloonBox.png"
					}, {
						bytes: 4655,
						md5: "2d433f874301ff278c4179d33a31f878",
						name: "BalloonCode.png"
					}, {
						bytes: 4838,
						md5: "14bd04fb97f7d631203f7d7f5767b7ae",
						name: "BalloonComputer.png"
					}, {
						bytes: 5953,
						md5: "e09f8056f0227d3bba523424be44e3f5",
						name: "BalloonElectric.png"
					}, {
						bytes: 6269,
						md5: "20b8c347612c36425942bfed4eaed9cc",
						name: "BalloonHackMonitor.png"
					}, {
						bytes: 6188,
						md5: "c1d899cfc321b9d3e6258cded439f739",
						name: "BalloonHiden.png"
					}, {
						bytes: 5705,
						md5: "ce765037a1d3e4e4ac0c9acd56788e54",
						name: "BalloonLockpick.png"
					}, {
						bytes: 5221,
						md5: "74f23d51196a6c9bb42da9fd247c5193",
						name: "BalloonMessage.png"
					}, {
						bytes: 5845,
						md5: "6c5d7fdfbb9856c5d38096d8386f6b10",
						name: "BalloonNone.png"
					}, {
						bytes: 5336,
						md5: "3c147ad9b9af349e237400da625878d6",
						name: "BalloonSave.png"
					}, {
						bytes: 5162,
						md5: "d1f1ecb48dc8e2080c5d8cbe70631127",
						name: "BalloonStair.png"
					}, {
						bytes: 6525,
						md5: "78de58ec76f4106dd4e0f62a1dcc3938",
						name: "BobElev.png"
					}, {
						bytes: 4612,
						md5: "2d84b998ed0a3e74c40fee22ca3324e7",
						name: "BobShadow.png"
					}, {
						bytes: 881,
						md5: "5d31dd40049d65a947609f725de0a4eb",
						name: "Bulkhead.png"
					}, {
						bytes: 470,
						md5: "70a9a63703ce87c24615a91421576e2a",
						name: "Bulkhead2.png"
					}, {
						bytes: 887,
						md5: "8dbacef531b5762733936c55dda4968d",
						name: "Bulkhead_wsl.png"
					}, {
						bytes: 920,
						md5: "2776f30ee672ab77a019fe37ce7ea3b3",
						name: "Bulkhead_wsr.png"
					}, {
						bytes: 4330,
						md5: "1fe5ecc610d859be23b9ee049fb62c42",
						name: "CrashWalls.png"
					}, {
						bytes: 143387,
						md5: "0d0f0e6ca50df0fa689221ce2fd89281",
						name: "GameBackground1.png"
					}, {
						bytes: 76743,
						md5: "be96c190391c28b784ea5eeaf16ea55c",
						name: "GameBackground10.png"
					}, {
						bytes: 79747,
						md5: "8b38150f5468e6daefca8cd3c435ea53",
						name: "GameBackground102.png"
					}, {
						bytes: 85100,
						md5: "977fa47a1e28ff4e437807955171e91f",
						name: "GameBackground103.png"
					}, {
						bytes: 149752,
						md5: "48db6f5f39a79a1576579ed9a4a0388a",
						name: "GameBackground2.png"
					}, {
						bytes: 170208,
						md5: "d6546c25e24a5ab00ab8bac0a4fe56a3",
						name: "GameBackground3.png"
					}, {
						bytes: 175543,
						md5: "1926dd95183082a14aaed8d5cce152a7",
						name: "GameBackground4.png"
					}, {
						bytes: 165032,
						md5: "fb4a1a57749b5a195f0ef76fe12779b0",
						name: "GameBackground5.png"
					}, {
						bytes: 170309,
						md5: "4990eeb8917836c6b9d98429eb36147e",
						name: "GameBackground6.png"
					}, {
						bytes: 122902,
						md5: "28e503ec433eb9b02d3124e5e48b562e",
						name: "GameBackground62.png"
					}, {
						bytes: 160001,
						md5: "6dd4cbd338f1b1da4087aaebb8576aae",
						name: "GameBackground7.png"
					}, {
						bytes: 96317,
						md5: "75bf0f8854a41a7fe0cb2cf305a9639c",
						name: "GameBackground72.png"
					}, {
						bytes: 103238,
						md5: "bea65081cffecce18abe72d8881c01e1",
						name: "GameBackground8.png"
					}, {
						bytes: 122155,
						md5: "db3c76272b1f7e9780ca8102a6ba3d94",
						name: "GameBackground82.png"
					}, {
						bytes: 107591,
						md5: "aeb189bab3abe8c3a7b633c794cfbab2",
						name: "GameBackground9.png"
					}, {
						bytes: 85841,
						md5: "fe2850b31181087d8db3ccdd360d35fa",
						name: "GameBackground92.png"
					},
					{
						bytes: 151910,
						md5: "ab5477b503cab1a842b5540d99417850",
						name: "MainScreenBg.png"
					}, {
						bytes: 4026,
						md5: "942de03c7e4d1d9fff87f86e9f4c6f29",
						name: "RightBackLine.png"
					}, {
						bytes: 3728,
						md5: "cdd5d1022510a7886362a68467eedce3",
						name: "Shadows1.png"
					}, {
						bytes: 3222,
						md5: "5c714b94acf5c3a8e22f83f75c4521a1",
						name: "Shadows10.png"
					}, {
						bytes: 2667,
						md5: "ffbfb17c3e1223e42ba9964cda69c693",
						name: "Shadows2.png"
					}, {
						bytes: 3169,
						md5: "83247634c44407e4ac01d491cabb1f01",
						name: "Shadows3.png"
					}, {
						bytes: 3670,
						md5: "7e966ca172057c792fe98cf69038e8e1",
						name: "Shadows4.png"
					},
					{
						bytes: 4014,
						md5: "ed1c2a8d01741024d4dba7881e56aebd",
						name: "Shadows5.png"
					}, {
						bytes: 3869,
						md5: "f82b3e4febdeecee3456c7e1e2ba1961",
						name: "Shadows6.png"
					}, {
						bytes: 3838,
						md5: "7765a1793fd57ca4b5a795b191d8eb42",
						name: "Shadows62.png"
					}, {
						bytes: 2175,
						md5: "3fc96fc5d46608b4d6e5476b2b79ed34",
						name: "Shadows7.png"
					}, {
						bytes: 3662,
						md5: "a2aa3bf27f195979e6ad15ba8bfff539",
						name: "Shadows72.png"
					}, {
						bytes: 3076,
						md5: "9bda6fe1e8462927a5e8197d1263a326",
						name: "Shadows8.png"
					}, {
						bytes: 5392,
						md5: "b66913cecf4a1d1ff07a86e301400f4b",
						name: "Shadows82.png"
					},
					{
						bytes: 2063,
						md5: "2d72cb389d645b4abadd5b127c9b750a",
						name: "Shadows9.png"
					}, {
						bytes: 3115,
						md5: "b69863c7d8e4d2bccef38833dde48f88",
						name: "Shadows92.png"
					}, {
						bytes: 3877,
						md5: "4da674ce0dca93a640c630d9e5d58f40",
						name: "StairDown.png"
					}, {
						bytes: 2258,
						md5: "40c3f03bb16ed397e8d2751f9e38e135",
						name: "StairUp.png"
					}, {
						bytes: 82190,
						md5: "2c08904aeef9bcd089d91bdb53048397",
						name: "backLevels.png"
					}, {
						bytes: 1045,
						md5: "4c31757ac91e5c39bc8a53944e3e7e28",
						name: "backTap.png"
					}, {
						bytes: 47167,
						md5: "7c62e0dc563b2f6449ba7e8ed90a2c83",
						name: "bobAnim/atlas0.png"
					},
					{
						bytes: 177779,
						md5: "e9dd2cbd640b8a60875659d64d215940",
						name: "bobAnim/library.json"
					}, {
						bytes: 32,
						md5: "a6ceb0b8b01f40499eb864b494aef09e",
						name: "bobAnim/md5"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "bobAnim/version"
					}, {
						bytes: 26591,
						md5: "37fbb2a0876031440d12bc5e383b0d6b",
						name: "bobRopeJump.png"
					}, {
						bytes: 4228,
						md5: "e97d08b6977b416c815f57a29c071a3d",
						name: "buttons/BaterySign.png"
					}, {
						bytes: 7764,
						md5: "b7c87d80793dc2a1e8b345df88c61f6d",
						name: "buttons/BtnClose.png"
					}, {
						bytes: 1068,
						md5: "064f2e1ffddec52dca8aff6f31c567a9",
						name: "buttons/BtnPause.png"
					}, {
						bytes: 2262,
						md5: "434571cdb14b8e69325de23a60079361",
						name: "buttons/BtnReset.png"
					}, {
						bytes: 3762,
						md5: "839e1bd6ff170864b28d8516e61bdb29",
						name: "buttons/Home.png"
					}, {
						bytes: 36229,
						md5: "de7094e6dbe98799839ea32d1bc4f547",
						name: "buttons/LevelBox1.png"
					}, {
						bytes: 35847,
						md5: "286fcc552d79809ec45f52c579f6dd32",
						name: "buttons/LevelBox10.png"
					}, {
						bytes: 41876,
						md5: "fabf9341b4768b7d93708c51d3031ffb",
						name: "buttons/LevelBox2.png"
					}, {
						bytes: 37599,
						md5: "31f4b9f69604ab5819ce555a4e5d253f",
						name: "buttons/LevelBox3.png"
					},
					{
						bytes: 36305,
						md5: "2ad0b12aa76c98a223c140b5fd564c6e",
						name: "buttons/LevelBox4.png"
					}, {
						bytes: 35242,
						md5: "45ae6b97ecb09913d7e1f9d6ef105aa0",
						name: "buttons/LevelBox5.png"
					}, {
						bytes: 39079,
						md5: "02ca518468b35abe494c6ac90a6407c8",
						name: "buttons/LevelBox6.png"
					}, {
						bytes: 35666,
						md5: "95ded0fd1f1e9656b27fbd5d34d82608",
						name: "buttons/LevelBox7.png"
					}, {
						bytes: 33103,
						md5: "2673272ee65a7706e08483be21a40547",
						name: "buttons/LevelBox8.png"
					}, {
						bytes: 33723,
						md5: "f8312723d6268eb55f1522c784d06601",
						name: "buttons/LevelBox9.png"
					}, {
						bytes: 30962,
						md5: "a99759b6d3386ccd7bb74f93b7f88e7a",
						name: "buttons/LevelBoxGray10.png"
					}, {
						bytes: 33744,
						md5: "a18226c1a754da815840333e5b154829",
						name: "buttons/LevelBoxGray2.png"
					}, {
						bytes: 30529,
						md5: "19b38a32b8c7e9038c1bfb0e826b46df",
						name: "buttons/LevelBoxGray3.png"
					}, {
						bytes: 29192,
						md5: "815c2092b9757c2cc8713f684ced1d87",
						name: "buttons/LevelBoxGray4.png"
					}, {
						bytes: 27469,
						md5: "462031a47a50a29ff97db80d052fb9d8",
						name: "buttons/LevelBoxGray5.png"
					}, {
						bytes: 32057,
						md5: "fb81f090510e39e5f4928b483c31e59e",
						name: "buttons/LevelBoxGray6.png"
					},
					{
						bytes: 29731,
						md5: "776f064c83d790e398407abeffb93b46",
						name: "buttons/LevelBoxGray7.png"
					}, {
						bytes: 27900,
						md5: "943b71d0a85c77b86843884b2243387a",
						name: "buttons/LevelBoxGray8.png"
					}, {
						bytes: 29578,
						md5: "82082189c0946874d785c3dfb908c0a8",
						name: "buttons/LevelBoxGray9.png"
					}, {
						bytes: 137741,
						md5: "2d36ec03fed1b8f7267d8856face1cf1",
						name: "buttons/LevelMapBack.png"
					}, {
						bytes: 574,
						md5: "22ec1ffaa26656e7585e472bcae9d56d",
						name: "buttons/LevelNumber1.png"
					}, {
						bytes: 1758,
						md5: "d09fd57f2e5402a0695db389fdee45fc",
						name: "buttons/LevelNumber10.png"
					},
					{
						bytes: 1300,
						md5: "303e88fa9769a0ff81c915cd745aa8d0",
						name: "buttons/LevelNumber2.png"
					}, {
						bytes: 1248,
						md5: "f0e3e4de1b4124d3da613461562eac7e",
						name: "buttons/LevelNumber3.png"
					}, {
						bytes: 920,
						md5: "49f8b0677142cb40db515948965f94dd",
						name: "buttons/LevelNumber4.png"
					}, {
						bytes: 1107,
						md5: "93290db1583982bfbb01af1cfe4a7d26",
						name: "buttons/LevelNumber5.png"
					}, {
						bytes: 1215,
						md5: "f758a067927dc258b42b254eea5d9413",
						name: "buttons/LevelNumber6.png"
					}, {
						bytes: 905,
						md5: "e9b6da759787769e48499fc97ed56df4",
						name: "buttons/LevelNumber7.png"
					},
					{
						bytes: 1182,
						md5: "32a36b5c970ef8197caf8d875d83e1ee",
						name: "buttons/LevelNumber8.png"
					}, {
						bytes: 1244,
						md5: "a71844b7d925d8a231eff855928dae5f",
						name: "buttons/LevelNumber9.png"
					}, {
						bytes: 822,
						md5: "21d3f3029012e0f113ef1815cb8e8183",
						name: "buttons/LevelStar.png"
					}, {
						bytes: 1140,
						md5: "fa9e9850f004e4bed09fd2bf1d7570cf",
						name: "buttons/LevelStarFull.png"
					}, {
						bytes: 2913,
						md5: "f7c8bdd7bed8bbdc47c1a4bf462cad76",
						name: "buttons/MapBattery.png"
					}, {
						bytes: 3908,
						md5: "bf0720ececd8806498afdd177d81660e",
						name: "buttons/Play.png"
					}, {
						bytes: 7171,
						md5: "b657cfa4a1cba0dfcc151bb80ab514ce",
						name: "buttons/PlayBig.png"
					}, {
						bytes: 10384,
						md5: "b7c1e38603dc6f3a3d7ee7366dbc17da",
						name: "buttons/PlayNext.png"
					}, {
						bytes: 5073,
						md5: "df328b2fe133c3f2874e85e9be0f38ce",
						name: "buttons/Replay.png"
					}, {
						bytes: 3218,
						md5: "9bb9aabc80d13266b721e9f5f27cca2e",
						name: "buttons/TimeSign.png"
					}, {
						bytes: 3153,
						md5: "8667267c362ae096977e2c83f50c2429",
						name: "buttons/docsCompelete.png"
					}, {
						bytes: 4163,
						md5: "0737c2c70a386b91c00b2dbc44ef04dc",
						name: "buttons/levelCircle.png"
					}, {
						bytes: 1673,
						md5: "92408676eb9d9a0deaf5fb853a253684",
						name: "codePanel/codebutton001.png"
					}, {
						bytes: 1719,
						md5: "b7316414ff61ea1a998957bff1025516",
						name: "codePanel/codebutton0010.png"
					}, {
						bytes: 1645,
						md5: "e7fc13a37e102d1ad84bb34df8636116",
						name: "codePanel/codebutton0011.png"
					}, {
						bytes: 1799,
						md5: "cf69eccca89feba2705cc6c5ac474daa",
						name: "codePanel/codebutton0012.png"
					}, {
						bytes: 1384,
						md5: "ae3732339e97a49046d905e913323e6f",
						name: "codePanel/codebutton002.png"
					}, {
						bytes: 1697,
						md5: "731e90aa6d958ab685ae68f4e04f6d1c",
						name: "codePanel/codebutton003.png"
					}, {
						bytes: 1756,
						md5: "9248b71cd9f7a938df9ac540650a112c",
						name: "codePanel/codebutton004.png"
					}, {
						bytes: 1513,
						md5: "8b20da8aeda487e9dad5692dd0564d11",
						name: "codePanel/codebutton005.png"
					}, {
						bytes: 1683,
						md5: "fccdbf73e97825290d2dec493690d25e",
						name: "codePanel/codebutton006.png"
					}, {
						bytes: 1723,
						md5: "c9c3873bca9fbcebd7d5a0d8b43c9c7f",
						name: "codePanel/codebutton007.png"
					}, {
						bytes: 1544,
						md5: "fe449c8b41595f314b266d40ff6f5104",
						name: "codePanel/codebutton008.png"
					}, {
						bytes: 1691,
						md5: "df881cc3123aa4039bc1c484d7cff342",
						name: "codePanel/codebutton009.png"
					}, {
						bytes: 1602,
						md5: "84d25474b51e5918cfb65521ad4b495a",
						name: "codePanel/codebuttonDown001.png"
					}, {
						bytes: 1335,
						md5: "1ae2413d93c6832c688c8da4b8ed4d78",
						name: "codePanel/codebuttonDown002.png"
					}, {
						bytes: 1637,
						md5: "4d61a41b227ee73a1bdf4b5c0d014a8c",
						name: "codePanel/codebuttonDown003.png"
					}, {
						bytes: 1688,
						md5: "fed0f070eb651366bbef63be065fe986",
						name: "codePanel/codebuttonDown004.png"
					}, {
						bytes: 1458,
						md5: "b4456398b085af04288804b81dbcd61b",
						name: "codePanel/codebuttonDown005.png"
					}, {
						bytes: 1620,
						md5: "69dd1afeb9174fb6e542479d4b65cafc",
						name: "codePanel/codebuttonDown006.png"
					}, {
						bytes: 1659,
						md5: "67b2e29bedc4989f05a62fc1f054c775",
						name: "codePanel/codebuttonDown007.png"
					}, {
						bytes: 1471,
						md5: "8181dd2c902042285ba23e693e4c6777",
						name: "codePanel/codebuttonDown008.png"
					}, {
						bytes: 1637,
						md5: "b0c503ef684b9f2badf2d9f545dde386",
						name: "codePanel/codebuttonDown009.png"
					}, {
						bytes: 1666,
						md5: "bdcdad170838c833e194ea39cb50b0ea",
						name: "codePanel/codebuttonDown010.png"
					}, {
						bytes: 1587,
						md5: "e2bcd63ed12bacc019c3b02d8ee92ca2",
						name: "codePanel/codebuttonDown011.png"
					}, {
						bytes: 1743,
						md5: "17a023d8995a06d9b56f1950e9159f8f",
						name: "codePanel/codebuttonDown012.png"
					},
					{
						bytes: 19843,
						md5: "bdc359f17c1e01cdf162c73f83726c6d",
						name: "codePanel/codepanelBack.png"
					}, {
						bytes: 2331,
						md5: "8876bbc6c250f1553322b9211f91b60a",
						name: "coin.png"
					}, {
						bytes: 23904,
						md5: "6e55a4704dd012eae09a9e205c2dd1e5",
						name: "effectsAnim/atlas0.png"
					}, {
						bytes: 18761,
						md5: "547533af75f066029a79bc4e91f1d7a5",
						name: "effectsAnim/library.json"
					}, {
						bytes: 32,
						md5: "80410b69f0b6ca162f3db05b244d2f2c",
						name: "effectsAnim/md5"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "effectsAnim/version"
					}, {
						bytes: 5008,
						md5: "15a75cdfd86a855113c01b40fcfb6c2e",
						name: "fonts/ComputerDark.fnt"
					}, {
						bytes: 2204,
						md5: "ef1354118b504b2d3353d7d237d7d1b9",
						name: "fonts/ComputerDark.png"
					}, {
						bytes: 5010,
						md5: "7a67b8ce4fa006f4f408699dbb9abf6d",
						name: "fonts/ComputerLight.fnt"
					}, {
						bytes: 2230,
						md5: "c275c291912ee81b3fa92cf06dace962",
						name: "fonts/ComputerLight.png"
					}, {
						bytes: 1434,
						md5: "a9d7204e9937fea1cbd81aa2e1b43cc6",
						name: "fonts/Interface.fnt"
					}, {
						bytes: 2633,
						md5: "383a53ac67c86e40f24b8f5f5c5691e2",
						name: "fonts/Interface.png"
					}, {
						bytes: 1361,
						md5: "891d5d20e476c9052df7f1138f877341",
						name: "fonts/Interface2.fnt"
					},
					{
						bytes: 8011,
						md5: "f25a00076956bd8d58bc64039c7d5d0e",
						name: "fonts/Interface2.png"
					}, {
						bytes: 17042,
						md5: "a5745569717742f711000c351bfdcf4a",
						name: "fonts/Messages.fnt"
					}, {
						bytes: 18517,
						md5: "ebafb3d456d92a9aeaecf4e365277617",
						name: "fonts/Messages.png"
					}, {
						bytes: 1623,
						md5: "37efc64d288d5c6679e606a80dba5d21",
						name: "fonts/Segment.fnt"
					}, {
						bytes: 3209,
						md5: "6aa962d099f5b25d2f11ab9e59442f6d",
						name: "fonts/Segment.png"
					}, {
						bytes: 25063,
						md5: "b1f4863d4e4da97e4d6afa9b0792c38a",
						name: "gameLogo.png"
					}, {
						bytes: 779,
						md5: "35a1155c153339dd37965fc4b3de5f10",
						name: "gameObjects/AlertLightOn.png"
					}, {
						bytes: 393,
						md5: "5db09f0e4f83e57dea98af02a341438e",
						name: "gameObjects/Battery.png"
					}, {
						bytes: 3232,
						md5: "118e7cb0ce6532067afdf16df390a2e2",
						name: "gameObjects/CrashWalls.png"
					}, {
						bytes: 2215,
						md5: "9ca798b326c3104fb775f10c05da7d29",
						name: "gameObjects/EndDoors.png"
					}, {
						bytes: 2762,
						md5: "c321e6b8c1a0a7bd92be982ee4c2d8c8",
						name: "gameObjects/ExitTarget.png"
					}, {
						bytes: 2726,
						md5: "06f1bc23aba28cbaf8607a0bda801574",
						name: "gameObjects/ExitTarget2.png"
					}, {
						bytes: 2777,
						md5: "eac0ed521ad18a4fd5986310bc2bf303",
						name: "gameObjects/GadgetTarget.png"
					}, {
						bytes: 2797,
						md5: "c4d25affcc2a2ba3863a24d55a237328",
						name: "gameObjects/GadgetTarget2.png"
					}, {
						bytes: 8734,
						md5: "056343c11589a36d68c2ac72d54815d1",
						name: "gameObjects/SavePoint.png"
					}, {
						bytes: 11063,
						md5: "31044196e6ad049bd25f864dd114dfc6",
						name: "gameObjects/SavePointActive.png"
					}, {
						bytes: 1038,
						md5: "f62e7c6e05f2aa4fae213f21d4709643",
						name: "gameObjects/SavePointLight.png"
					}, {
						bytes: 3070,
						md5: "7d25d1bff3c12d07aa678893744a0aeb",
						name: "gameObjects/SavePointTop.png"
					}, {
						bytes: 5184,
						md5: "b0071e0d8e6204442fdaebff38750720",
						name: "gameObjects/StairDoor1.png"
					}, {
						bytes: 3156,
						md5: "43eacf5667b3a17c0bb5513350de1323",
						name: "gameObjects/StairDoor2.png"
					}, {
						bytes: 1887,
						md5: "fd11b5fec18383d4ef98f60a32522f93",
						name: "gameObjects/StairDoor3.png"
					}, {
						bytes: 1373,
						md5: "c749de78b6cc7e00d710a7acd5340173",
						name: "gameObjects/TrapDoor.png"
					}, {
						bytes: 1491,
						md5: "1cadf097b54dca969982ff6e97d95a0b",
						name: "gameObjects/box.png"
					}, {
						bytes: 7149,
						md5: "25d88c2bd3ef9c6464eb3e1876268e45",
						name: "gameObjects/camera0001.png"
					}, {
						bytes: 4288,
						md5: "9f93e0720bf0b6e56d4201660e775abb",
						name: "gameObjects/camera0002.png"
					}, {
						bytes: 4278,
						md5: "6939831c1e5d5dbb94d746864a23a2e5",
						name: "gameObjects/camera0003.png"
					}, {
						bytes: 626,
						md5: "4bb507d22eaed92becba924e52a7da91",
						name: "gameObjects/cameraFront.png"
					}, {
						bytes: 892,
						md5: "eba55d40b2380a634389ac22047c2e9a",
						name: "gameObjects/codepanel.png"
					}, {
						bytes: 3121,
						md5: "b8f0321a403021a84462022d16c5101b",
						name: "gameObjects/door1.png"
					}, {
						bytes: 1505,
						md5: "82f4dc64037ef2f271a38a35d28262e5",
						name: "gameObjects/electricPanel1.png"
					}, {
						bytes: 4905,
						md5: "1138cdc347c35a09e4c271612bd33943",
						name: "gameObjects/electricPanel2.png"
					}, {
						bytes: 1708,
						md5: "a185a91a5816fb403e37188f273ecb8f",
						name: "gameObjects/elevatorBack.png"
					}, {
						bytes: 2529,
						md5: "8c0f09125960033f495ff655483cd507",
						name: "gameObjects/elevatorLeftDoor.png"
					}, {
						bytes: 2353,
						md5: "0ac8b0dcfab95089cf356d62b83c1113",
						name: "gameObjects/elevatorRightDoor.png"
					}, {
						bytes: 426,
						md5: "d098f60eb47c346613554ebdbaccc0e4",
						name: "gameObjects/laserLines.png"
					}, {
						bytes: 544,
						md5: "37e6be4578544e2d141f6264150f5475",
						name: "gameObjects/message.png"
					}, {
						bytes: 2684,
						md5: "10033fb4b18f2604d1764d423f4fb2a9",
						name: "gameObjects/padlock.png"
					}, {
						bytes: 1047,
						md5: "154f706d232d668360394b8b27308586",
						name: "gameObjects/sidedoor.png"
					}, {
						bytes: 913,
						md5: "97b271ccb5d8fba391033ba63e3a9978",
						name: "gameObjects/sidedoor2.png"
					}, {
						bytes: 18526,
						md5: "950a0d91aa65db954fadc2686796bf03",
						name: "guardAAnim/atlas0.png"
					}, {
						bytes: 142924,
						md5: "c998a1fbd3b5dacb49966ac89b9b1f8e",
						name: "guardAAnim/library.json"
					}, {
						bytes: 32,
						md5: "4e83d4916f1692497e52c49dd08e5806",
						name: "guardAAnim/md5"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "guardAAnim/version"
					},
					{
						bytes: 22133,
						md5: "f03c9e81bded298cea116c106e674aeb",
						name: "guardBAnim/atlas0.png"
					}, {
						bytes: 155615,
						md5: "0d09a6827bb339ea7597f0f540de5d35",
						name: "guardBAnim/library.json"
					}, {
						bytes: 32,
						md5: "dfd05d197bf9aca52d6fff302f8a57ff",
						name: "guardBAnim/md5"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "guardBAnim/version"
					}, {
						bytes: 100,
						md5: "ca91752a3b5327c37fddb0641b61626b",
						name: "hackerPanel/block.png"
					}, {
						bytes: 1105,
						md5: "66817350c6062717348dcd0d8ccc4edd",
						name: "hackerPanel/dot.png"
					}, {
						bytes: 46937,
						md5: "c46a12fffc9378f00e6b9b7a6dc812ca",
						name: "hackerPanel/panelBack.png"
					}, {
						bytes: 292,
						md5: "21e086881fca2e26baf12ba15676be44",
						name: "hackerPanel/marker.png"
					}, {
						bytes: 983,
						md5: "6c7c8b57fdbbdde5ab6fa5e592ef9229",
						name: "hackerPanel/tapZone.png"
					}, {
						bytes: 726,
						md5: "bde723608e956e2305df162dc941bc3a",
						name: "hackerPanel/target.png"
					}, {
						bytes: 750,
						md5: "137383b03205053b3fade1de90f67adc",
						name: "hackerPanel/targetFull.png"
					}, {
						bytes: 2746,
						md5: "b6fa3208e64071b491c599486ef4232e",
						name: "level1.xml"
					}, {
						bytes: 3686,
						md5: "25194be80c5d7d433ec88efdfbf426cf",
						name: "level10.xml"
					},
					{
						bytes: 3652,
						md5: "878030a0d73ad5c87531ea280cb27ae1",
						name: "level102.xml"
					}, {
						bytes: 3296,
						md5: "d957a2e224d52a9c2f66f823f3bb01f1",
						name: "level103.xml"
					}, {
						bytes: 3313,
						md5: "6721211391e5281c3d05b4f072edb42f",
						name: "level2.xml"
					}, {
						bytes: 3434,
						md5: "43016d39dae6620fad9010c4f9199839",
						name: "level3.xml"
					}, {
						bytes: 3885,
						md5: "b60cb5122a4e8816d6d272e07c640add",
						name: "level4.xml"
					}, {
						bytes: 4425,
						md5: "3706f5acf200031b19c41ca257451947",
						name: "level5.xml"
					}, {
						bytes: 3515,
						md5: "e6315eee9560d5eb32107b7d98d2daf8",
						name: "level6.xml"
					}, {
						bytes: 2909,
						md5: "63369fcca00d931f3980c20c9e79b8fd",
						name: "level62.xml"
					}, {
						bytes: 3661,
						md5: "7a78cadbd703d890fe987c380728d876",
						name: "level7.xml"
					}, {
						bytes: 3021,
						md5: "76a61b75189c8f774808e7e566e98933",
						name: "level72.xml"
					}, {
						bytes: 3832,
						md5: "a794665b3b825c7b568ffa7554f3aca1",
						name: "level8.xml"
					}, {
						bytes: 3805,
						md5: "27a30b8de095547b53bb0b3ea0fcccf2",
						name: "level82.xml"
					}, {
						bytes: 4357,
						md5: "d8df8e90fb84d57da52b6310f15ee2c2",
						name: "level9.xml"
					}, {
						bytes: 4179,
						md5: "4703c21c0663ea7f2543648fddb42de7",
						name: "level92.xml"
					}, {
						bytes: 7910,
						md5: "eea888daf0b3804fd7bbfd635c4050b1",
						name: "monitor/BtnArrow.png"
					}, {
						bytes: 8185,
						md5: "5d1cfe75f36517dada6b1acb32f92642",
						name: "monitor/BtnArrow2.png"
					}, {
						bytes: 134383,
						md5: "72898da7c776872097cc759eae391dad",
						name: "monitor/MonitorBack.png"
					}, {
						bytes: 109,
						md5: "d913a716379f87396f68c28e5f702f0c",
						name: "monitor/MonitorLine.png"
					}, {
						bytes: 177,
						md5: "921dcc50487f6a4f59c6c86498a79853",
						name: "monitor/MonitorSelector.png"
					}, {
						bytes: 2499,
						md5: "7004c74994a75174c335294229068c63",
						name: "monitor/asciibob.png"
					}, {
						bytes: 7035,
						md5: "4fc14e2979a9ce9db319080c8b5bda32",
						name: "monitor/blackcat.png"
					},
					{
						bytes: 128,
						md5: "6041287e35d5416514896e08d53c904d",
						name: "monitor/computer.png"
					}, {
						bytes: 2307,
						md5: "f8fa3f575aebd6fe314de4c2599c4cd6",
						name: "monitor/doorCodeTxt.png"
					}, {
						bytes: 5078,
						md5: "63a4e33ac87026a1f2e36777f978640c",
						name: "monitor/house.png"
					}, {
						bytes: 587,
						md5: "82ace77219bc95ae7d13371b2b851df9",
						name: "monitor/monitorNum0.png"
					}, {
						bytes: 453,
						md5: "7acb9029999b694ce86484458d05c9a9",
						name: "monitor/monitorNum1.png"
					}, {
						bytes: 574,
						md5: "12a4e0c166a0edb95ca6ee63f0f9c9cd",
						name: "monitor/monitorNum2.png"
					}, {
						bytes: 465,
						md5: "8e77140f1b59114fcc4c3cbcba9eba34",
						name: "monitor/monitorNum4.png"
					}, {
						bytes: 602,
						md5: "c88ca376db812d163b3ea2a907c488ee",
						name: "monitor/monitorNum3.png"
					}, {
						bytes: 564,
						md5: "3277615b16a5280dc04a1297ab7d9cfa",
						name: "monitor/monitorNum5.png"
					}, {
						bytes: 703,
						md5: "f05e937356a8ba66c714c1b02ba15d25",
						name: "monitor/monitorNum6.png"
					}, {
						bytes: 550,
						md5: "626cab443580ee729a75da41a56533fb",
						name: "monitor/monitorNum7.png"
					}, {
						bytes: 707,
						md5: "93ea258223d4e81fa8a5cf2999239d81",
						name: "monitor/monitorNum8.png"
					}, {
						bytes: 703,
						md5: "015869ea1fff09ab9b30a23d7008cdf4",
						name: "monitor/monitorNum9.png"
					},
					{
						bytes: 91,
						md5: "3d5967e54046c00281847c86998bab1c",
						name: "monitor/shadow.png"
					}, {
						bytes: 5114,
						md5: "f25003bd93708ce291102c807f63d18d",
						name: "monitor/superspy.png"
					}, {
						bytes: 12093,
						md5: "203165794c16e26009325ba3ad22a34c",
						name: "mummyAnim/atlas0.png"
					}, {
						bytes: 32,
						md5: "009fbcf7debf157294f61cb15748caf2",
						name: "mummyAnim/md5"
					}, {
						bytes: 87074,
						md5: "fd43468d13ae6f981d285b26c60cc7da",
						name: "mummyAnim/library.json"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "mummyAnim/version"
					}, {
						bytes: 793703,
						md5: "b6d75df2b7443c0e4023a52b4e6efec9",
						name: "music/btb3_bossfight_v1.mp3"
					}, {
						bytes: 559646,
						md5: "0655dc3649b742532ad8cf81fb7c8088",
						name: "music/btb3_comix_theme.mp3"
					}, {
						bytes: 1118039,
						md5: "07f1cdfaf0570b734e2753b52afc7ce2",
						name: "music/btb3_main_theme.mp3"
					}, {
						bytes: 1088364,
						md5: "63e6aa814d20935429c3cc39fe75b83e",
						name: "music/btb3_gameplay_theme.mp3"
					}, {
						bytes: 72673,
						md5: "9a2fb4ac88d38f7a510daeb9304a06d3",
						name: "note.png"
					}, {
						bytes: 2646,
						md5: "2ef2b2a92a720d009ce855e30575f7f6",
						name: "padlockElements/backpack.png"
					}, {
						bytes: 16497,
						md5: "0ecb6485a2c3ba175fb36d87e95d1541",
						name: "padlockElements/lockarc.png"
					}, {
						bytes: 5249,
						md5: "22b6cf14dfdd07c821302318e3cf52b0",
						name: "padlockElements/lockclick0001.png"
					}, {
						bytes: 6310,
						md5: "6fe71abb758cab9435946495d0148d71",
						name: "padlockElements/lockclick0002.png"
					}, {
						bytes: 8089,
						md5: "849c563d4ccacde7f85cdd81bb1813c5",
						name: "padlockElements/lockclick0001.png.png"
					}, {
						bytes: 4933,
						md5: "e120870dcdf968e33ddda4158774a97c",
						name: "padlockElements/lockhole.png"
					}, {
						bytes: 2634,
						md5: "6fc681ac5b606905e54c82286d0e7cb0",
						name: "padlockElements/lockhole2.png"
					}, {
						bytes: 3326,
						md5: "a92eb42b6d38eeb724f96fb4dd3b8168",
						name: "padlockElements/lockpick.png"
					}, {
						bytes: 9319,
						md5: "0e156f41e366264613fad62892115fae",
						name: "padlockElements/padlockZone.png"
					}, {
						bytes: 9046,
						md5: "75f1c5f38c699bd40d2f777d03f34efa",
						name: "padlockElements/padlockZoneUp.png"
					}, {
						bytes: 44448,
						md5: "2ffdcdcfdf70871cc56fb25f3a82b76a",
						name: "padlockElements/padlockbase.png"
					}, {
						bytes: 4272,
						md5: "688c5c934eab40b22c5691630095823f",
						name: "rankingScreen/BtnNo.png"
					}, {
						bytes: 7332,
						md5: "4fc481968ae25c9cb2b6cc5f2074fda1",
						name: "rankingScreen/BtnYes.png"
					},
					{
						bytes: 39799,
						md5: "43d0dbd52852f959124188491780a361",
						name: "rankingScreen/RankScreen.png"
					}, {
						bytes: 16327,
						md5: "d4448730aa56f3b94a38313c1e11dd4c",
						name: "scientistAnim/atlas0.png"
					}, {
						bytes: 129667,
						md5: "f5b1f01e3ebe75431c087d0b6d76fef0",
						name: "scientistAnim/library.json"
					}, {
						bytes: 32,
						md5: "758279e3cecea3ed51ad141da60a4e8f",
						name: "scientistAnim/md5"
					}, {
						bytes: 1,
						md5: "a2a591894f630d2714e452b5e82f09ae",
						name: "scientistAnim/version"
					}, {
						bytes: 31545,
						md5: "20767adadf43fa69e464799a2d4a236a",
						name: "savePoint/BackSP.png"
					}, {
						bytes: 4E3,
						md5: "56f5281ab252e92eaf74f1dcaa2c5743",
						name: "savePoint/BtnAd.png"
					}, {
						bytes: 7346,
						md5: "8def4682577a916172c98b64644a1486",
						name: "savePoint/BtnBattery.png"
					}, {
						bytes: 7629,
						md5: "19be52c28f9412ee3ba7f33606ba08c7",
						name: "savePoint/BtnBatteryGray.png"
					}, {
						bytes: 52237,
						md5: "d0147ca9d2fea9c7a7f050944cb97949",
						name: "screens/BackgrndBusted.png"
					}, {
						bytes: 5692,
						md5: "d7a88572c05af745ef235d403b85d9c8",
						name: "screens/BackgrndGadget.png"
					}, {
						bytes: 55834,
						md5: "a7f0db42802e4cb99f13fdf4f8cf1849",
						name: "screens/BackgrndWellDone.png"
					},
					{
						bytes: 19089,
						md5: "83d48d03b9f35a77b371037a6fa70c04",
						name: "screens/Busted.png"
					}, {
						bytes: 5717,
						md5: "893491d37e306351d2ba8062866ccfa7",
						name: "screens/GadgetPlace.png"
					}, {
						bytes: 15284,
						md5: "7fd73dfa5011d1b7ae4dedf91ef9916b",
						name: "screens/NewGadget.png"
					}, {
						bytes: 24540,
						md5: "69a19f3c5a822b9dd1c46208dd1aab69",
						name: "screens/Paused.png"
					}, {
						bytes: 18361,
						md5: "85d3d014241b26464e8b35fdc6a6a0fd",
						name: "screens/WellDone.png"
					}, {
						bytes: 3350,
						md5: "5a045a8e771bfe5969efe8738d35921b",
						name: "screens/WinStar.png"
					}, {
						bytes: 3915,
						md5: "bc838ef72c7d08b8422d3e675e64be4a",
						name: "screens/WinStarFull.png"
					}, {
						bytes: 10506,
						md5: "ce5a3b40c95bfb1a2b711dab1184e9e4",
						name: "screens/hackerkit.png"
					}, {
						bytes: 9263,
						md5: "e9c7164bfede87bda521052ace93b5e3",
						name: "screens/lockpick.png"
					}, {
						bytes: 13088,
						md5: "6f2628a384a05c6c2de3a9ff89842d05",
						name: "screens/nippers.png"
					}, {
						bytes: 6636,
						md5: "a3a3b30b04f18d3b10e8cd6c96ea1d2f",
						name: "screens/setbox.png"
					}, {
						bytes: 11841,
						md5: "9b414a08955a272c0282eeba774854c3",
						name: "screens/shocker.png"
					}, {
						bytes: 40161,
						md5: "05ff2892a8cefdeabcdd6cbc9b5ea828",
						name: "sounds/alarm.mp3"
					},
					{
						bytes: 5889,
						md5: "7fd08a40a36b6eb485e8e99ad8d43930",
						name: "sounds/alert1.mp3"
					}, {
						bytes: 11740,
						md5: "66d03ec3ab54c4d9366550d954984773",
						name: "sounds/alert2.mp3"
					}, {
						bytes: 19686,
						md5: "067949e68829c3fcffef39db3d3c6769",
						name: "sounds/bob_busted.mp3"
					}, {
						bytes: 9240,
						md5: "41f653f7ba119aabb7931411267d7cb8",
						name: "sounds/bob_footsteps.mp3"
					}, {
						bytes: 12588,
						md5: "b3bc6d2884d68b41ee240dd090c87e8b",
						name: "sounds/bob_level_complete.mp3"
					}, {
						bytes: 9667,
						md5: "78419fde38988bbd48c6bb1fb0d37262",
						name: "sounds/bob_level_complete_var.mp3"
					},
					{
						bytes: 31812,
						md5: "12f7911b1866d04726a152e5638bad27",
						name: "sounds/bob_looks_around.mp3"
					}, {
						bytes: 7151,
						md5: "4f23adcb14571cb80cc1731cd7dfd5c6",
						name: "sounds/bob_punch_var.mp3"
					}, {
						bytes: 11745,
						md5: "e9becae36de95322b1cebe346ed2b9a6",
						name: "sounds/bob_shadow.mp3"
					}, {
						bytes: 10909,
						md5: "ee46234cb5008101bb64a8dc95a7eed5",
						name: "sounds/body_fall.mp3"
					}, {
						bytes: 142570,
						md5: "4241270566adfce21c1925e272cc6845",
						name: "sounds/boss_tv_voice1.mp3"
					}, {
						bytes: 7568,
						md5: "19688df66f9c50c0fc8caed8d02fc6cf",
						name: "sounds/button_click.mp3"
					},
					{
						bytes: 20940,
						md5: "655382e915cab0ee625629c53e333785",
						name: "sounds/box_cover.mp3"
					}, {
						bytes: 2556,
						md5: "610226c03cedc13e8fe67bf09335729c",
						name: "sounds/code_button_push.mp3"
					}, {
						bytes: 7984,
						md5: "e8e6939ae4c3e09b706e40e9e775dc07",
						name: "sounds/code_error.mp3"
					}, {
						bytes: 38494,
						md5: "c708c9d1ccce9684ce9f8a569b8d934e",
						name: "sounds/code_open.mp3"
					}, {
						bytes: 4640,
						md5: "3ab51fac58c4811e6c9e545cd8d90cf7",
						name: "sounds/code_panel.mp3"
					}, {
						bytes: 76531,
						md5: "56bcea8cc379b7fe374924c8bc724120",
						name: "sounds/comix_final1.mp3"
					}, {
						bytes: 32645,
						md5: "2458ab89a58e9b3e3421debb37cf6846",
						name: "sounds/comix_final2.mp3"
					}, {
						bytes: 33481,
						md5: "c91f19cc540dbff47441a9d024d09bfd",
						name: "sounds/comix_final3.mp3"
					}, {
						bytes: 80665,
						md5: "8c237529c538f08d6f46721534133057",
						name: "sounds/comix_final4.mp3"
					}, {
						bytes: 51872,
						md5: "6eba39d0544f27c7ae85496cd299bc28",
						name: "sounds/comix_start1.mp3"
					}, {
						bytes: 46438,
						md5: "f88ffc11b5baad49a22c26d4f7c9c16e",
						name: "sounds/comix_start2.mp3"
					}, {
						bytes: 28468,
						md5: "ec313f42ba3f84e7e78df24b3aac084f",
						name: "sounds/comix_start2_1.mp3"
					}, {
						bytes: 40587,
						md5: "8650e62651e242f8c158b59772a91a98",
						name: "sounds/comix_start3.mp3"
					}, {
						bytes: 46020,
						md5: "5abdc9a3aeb3bebcff7291555ac1ae21",
						name: "sounds/comix_start4.mp3"
					}, {
						bytes: 27630,
						md5: "4c1f154852aaa1b12151ed015824cfb0",
						name: "sounds/comix_start5.mp3"
					}, {
						bytes: 51874,
						md5: "94ea609947102d9e95d30f285815d5e6",
						name: "sounds/comix_start5_1.mp3"
					}, {
						bytes: 48528,
						md5: "9bfee7084053b3024cc0b4c053f5f020",
						name: "sounds/comix_start6.mp3"
					}, {
						bytes: 5481,
						md5: "71c5be6ccce0ef13f373921103d43a27",
						name: "sounds/computer_cursor.mp3"
					}, {
						bytes: 37662,
						md5: "a26dd0859e8b4bdf9332aeed51dfc531",
						name: "sounds/computer_load.mp3"
					}, {
						bytes: 42,
						md5: "b533d47cc3eba5c75347e66cba5193ac",
						name: "sounds/desktop.ini"
					}, {
						bytes: 22612,
						md5: "f5f856a0dbd778179cb0653f0795370b",
						name: "sounds/dog_attack.mp3"
					}, {
						bytes: 4642,
						md5: "05d5fc9c9347f5438ae024e6ecb045d4",
						name: "sounds/dog_barking1.mp3"
					}, {
						bytes: 4642,
						md5: "5d4c473a7341c5e912ed74e3b8270537",
						name: "sounds/dog_barking2.mp3"
					}, {
						bytes: 11756,
						md5: "0d5b42d3b084b53575738bc9e84216ad",
						name: "sounds/electric_cabinet_open.mp3"
					}, {
						bytes: 33902,
						md5: "815da47f38dc6c4cca164be772cdd153",
						name: "sounds/electro_shocker.mp3"
					}, {
						bytes: 7988,
						md5: "1374e600fc0bc599a0e16c892e8e3bea",
						name: "sounds/elevator_button.mp3"
					}, {
						bytes: 16347,
						md5: "1e3c78f3793eb5837450dbe26a8d5ec3",
						name: "sounds/elevator_close.mp3"
					}, {
						bytes: 27631,
						md5: "6ae9b3cf216f6660ddbe7bfc30237490",
						name: "sounds/elevator_open.mp3"
					}, {
						bytes: 20528,
						md5: "5588d6d004b43f3a701282ab33f01589",
						name: "sounds/final_door_close.mp3"
					}, {
						bytes: 33483,
						md5: "6e4b20e26c4dae5b4afe468acc41c792",
						name: "sounds/final_door_open.mp3"
					},
					{
						bytes: 25121,
						md5: "2f19bb8dd9169d0659c74cee7f32855f",
						name: "sounds/get_battery.mp3"
					}, {
						bytes: 23876,
						md5: "0985299cb252211309920ef3d3f9aa35",
						name: "sounds/hacker_toolkit_error.mp3"
					}, {
						bytes: 36413,
						md5: "8db8d6a6045be3c58fc292a0a2bedf20",
						name: "sounds/hacker_toolkit_win.mp3"
					}, {
						bytes: 41425,
						md5: "283939d17abc47a70cecfc3f5e688977",
						name: "sounds/level_complete.mp3"
					}, {
						bytes: 25538,
						md5: "6701c9b50605abde9ed7cee64c67894d",
						name: "sounds/lock_error.mp3"
					}, {
						bytes: 32228,
						md5: "dbdeb1d904d5bd48060c03073fb84b05",
						name: "sounds/lock_unlocked.mp3"
					},
					{
						bytes: 24285,
						md5: "d009ab51f3433849551a825057e2d903",
						name: "sounds/mummy_angry.mp3"
					}, {
						bytes: 38497,
						md5: "2f0f0e811eafa4e6728efacac5dd52ec",
						name: "sounds/mummy_attack.mp3"
					}, {
						bytes: 17184,
						md5: "2274fb662afa20d00d25b2f052105183",
						name: "sounds/mummy_footsteps.mp3"
					}, {
						bytes: 18433,
						md5: "332ba91ad04a4a7708d77560bef3b945",
						name: "sounds/mummy_idle.mp3"
					}, {
						bytes: 7983,
						md5: "eb931722f9b186e9fab226ba310adb66",
						name: "sounds/mummy_run.mp3"
					}, {
						bytes: 34733,
						md5: "6164581fdc42507d2cf5dccc639a1f7e",
						name: "sounds/new_gadget.mp3"
					}, {
						bytes: 8821,
						md5: "2acd6e9bb6f02f69bd541d9356c46521",
						name: "sounds/nippers_cut.mp3"
					}, {
						bytes: 5060,
						md5: "9d96c18102b9a661bc9a06408f371592",
						name: "sounds/nippers_move.mp3"
					}, {
						bytes: 10910,
						md5: "104e35279f199f845a9dcf51547a732f",
						name: "sounds/open_paper.mp3"
					}, {
						bytes: 44342,
						md5: "c5f3f6fa531993a5a7440bd3109ff243",
						name: "sounds/scaner.mp3"
					}, {
						bytes: 20531,
						md5: "c59820a2aaa03cfb8847ffa4db2c7cf3",
						name: "sounds/security_footsteps.mp3"
					}, {
						bytes: 12170,
						md5: "6466cef2ec78142d162db7e4009040ff",
						name: "sounds/soldier_footsteps.mp3"
					}, {
						bytes: 25122,
						md5: "3829f771011fb3ae27bdf4c70aed9f71",
						name: "sounds/soldier_idle.mp3"
					}, {
						bytes: 27631,
						md5: "8d5314be460d345b52afc82c620af6b0",
						name: "sounds/soldier_radio.mp3"
					}, {
						bytes: 21771,
						md5: "83ad91a31106b6fefef33e09fbf617c7",
						name: "sounds/star1.mp3"
					}, {
						bytes: 21771,
						md5: "ea8cc945c40f7074ce562440af0f195c",
						name: "sounds/star2.mp3"
					}, {
						bytes: 20935,
						md5: "ef4d12c0dd39f6cb432b69eaa003aec3",
						name: "sounds/star3.mp3"
					}, {
						bytes: 3351,
						md5: "66e2ea1357272482f98cbb2bfdbc95d3",
						name: "tutorial/computerTip.png"
					}, {
						bytes: 4443,
						md5: "b81c879402cc54289cb139784b43acc2",
						name: "tutorial/hackKitTip.png"
					}, {
						bytes: 5585,
						md5: "73e4158d3db22de2f5ce43c4c346cbd4",
						name: "tutorial/lockpickTip.png"
					}, {
						bytes: 3961,
						md5: "54989c1ca69c5ec9345431cd8da1eb76",
						name: "tutorial/tip1.png"
					}, {
						bytes: 9384,
						md5: "7c7b53c1c53d69ace2136398ab74ba32",
						name: "tutorial/tip10.png"
					}, {
						bytes: 3977,
						md5: "625e96130351aec37b3cef1ae720a63b",
						name: "tutorial/tip2.png"
					}, {
						bytes: 5065,
						md5: "1cfc803542b84a7c3a67b7d99142bec2",
						name: "tutorial/tip3.png"
					}, {
						bytes: 14626,
						md5: "01ac63fce6ffd279680bcebc2078724a",
						name: "tutorial/tip4.png"
					},
					{
						bytes: 4951,
						md5: "1734689e5be72ec6e6b3e69ea5f03cce",
						name: "tutorial/tip5.png"
					}, {
						bytes: 14237,
						md5: "dc82d04e2083ddd7a994c9a2b4f2c75f",
						name: "tutorial/tip6.png"
					}, {
						bytes: 8607,
						md5: "f95388e0f7bb028b48d91c76f4938d41",
						name: "tutorial/tip7.png"
					}, {
						bytes: 9097,
						md5: "1a3efc4bc55ee24e005c7807fe85477e",
						name: "tutorial/tip8.png"
					}, {
						bytes: 9308,
						md5: "337f99658153a81f29ff2e750b7c5ede",
						name: "tutorial/tip9.png"
					}, {
						bytes: 5217,
						md5: "aeac3fea889c02e67206ee498381dc09",
						name: "tutorial/wireTip.png"
					}, {
						bytes: 8240,
						md5: "1bf37533f8ac64f67809aae4a39cf3c1",
						name: "wiresPanel/BtnArrow.png"
					}, {
						bytes: 7922,
						md5: "c750cb0eadbc9d7da192a8f3010ea801",
						name: "wiresPanel/BtnArrow2.png"
					}, {
						bytes: 10142,
						md5: "f8338591922c0e8c86e5391a27a10494",
						name: "wiresPanel/BtnNippers.png"
					}, {
						bytes: 7896,
						md5: "203e6b27703e793ea12f5496e6c4a32b",
						name: "wiresPanel/nippersClose.png"
					}, {
						bytes: 7480,
						md5: "850ff453646cc6d4c811aab3647ae755",
						name: "wiresPanel/nippersOpen.png"
					}, {
						bytes: 1973,
						md5: "b9812f32304d34a9c48b48568a123806",
						name: "wiresPanel/wireSignalEnd0001.png"
					}, {
						bytes: 1780,
						md5: "ce3da9cd52def537e9dacb08817dd9bc",
						name: "wiresPanel/wireSignalEnd0002.png"
					}, {
						bytes: 520,
						md5: "2ffe414e928fe14695764be20a65dd12",
						name: "wiresPanel/wireblue0001.png"
					}, {
						bytes: 1711,
						md5: "64a2dc58230b1a32b7b061590487d86d",
						name: "wiresPanel/wireblue0002.png"
					}, {
						bytes: 576,
						md5: "24ec794c904fd7f3afe3d4653cf48aac",
						name: "wiresPanel/wiregreen0001.png"
					}, {
						bytes: 1721,
						md5: "20a9887dd5c66ea31ed990d1e3bce98b",
						name: "wiresPanel/wiregreen0002.png"
					}, {
						bytes: 603,
						md5: "b909ef3fb1cc3e6ee388e071a96ddb8a",
						name: "wiresPanel/wireorange0001.png"
					}, {
						bytes: 1698,
						md5: "53c6e1deb8524671eeb1a6619b6f385c",
						name: "wiresPanel/wireorange0002.png"
					}, {
						bytes: 973,
						md5: "36a1aa3d0ce52b617336f386b6da50db",
						name: "wiresPanel/wires0001.png"
					}, {
						bytes: 1126,
						md5: "b5e1fa9426f5a48665805de6c041458b",
						name: "wiresPanel/wires0002.png"
					}, {
						bytes: 988,
						md5: "630bb8eefd79feedb946cc65aa61c86a",
						name: "wiresPanel/wires0003.png"
					}, {
						bytes: 1019,
						md5: "3ece6a670ed928da95240cc0701293d9",
						name: "wiresPanel/wires0004.png"
					}, {
						bytes: 807,
						md5: "b80082bae216fee85b77e8f3ea072eaa",
						name: "wiresPanel/wires0005.png"
					}, {
						bytes: 734,
						md5: "22dea66e9f90f82abbae6d3110cf1d5d",
						name: "wiresPanel/wires0006.png"
					}, {
						bytes: 442,
						md5: "46500e217507d425a151f80f47c34fef",
						name: "wiresPanel/wires0007.png"
					}, {
						bytes: 512,
						md5: "a2498c21babd2fda747d2ae81a504481",
						name: "wiresPanel/wires0008.png"
					}, {
						bytes: 75534,
						md5: "59709ef8b54b50458e17610e1ca1f7bf",
						name: "wiresPanel/wirespanel.png"
					}
				],
				comics: [{
						bytes: 12985,
						md5: "a46c43ecdf492e59a198028fb3a39131",
						name: "picture1.png"
					}, {
						bytes: 5600,
						md5: "e1ade6bfd74a933885b0ede5143c7457",
						name: "picture2.png"
					}, {
						bytes: 9890,
						md5: "c975a2482232f058125d77e83e9fd30d",
						name: "picture3.png"
					},
					{
						bytes: 13509,
						md5: "95c9fef88ec516a4b1bf70721730d4b1",
						name: "picture4.png"
					}, {
						bytes: 12612,
						md5: "c86a3388048f7be1d8b2d7f942563f5b",
						name: "picture5.png"
					}, {
						bytes: 10811,
						md5: "c7e2f7f1227a8d56ee3d499e19f6cb37",
						name: "picture6.png"
					}, {
						bytes: 5892,
						md5: "5c8f8ac0cdc013ec1d579697b27d53dc",
						name: "picture7.png"
					}, {
						bytes: 12726,
						md5: "86fdeb2f15a9886e0b343b7dc1017580",
						name: "picture8.png"
					}
				]
			}]
		}
	};
	D._supportsCrossOrigin = function() {
		var a;
		a = 0 <= window.navigator.userAgent.indexOf("Linux; U; Android") ? !1 : null != (new XMLHttpRequest).withCredentials;
		a || null;
		return a
	}();
	m._scratchPoint = new Ub;
	R.NEWLINE = new Wb(10);
	Z._sharedEvent = new Ac;
	V._sharedEvent = new Bc;
	K._sharedEvent = new Cc;
	Ba.CANVAS_TEXTURES = (new W("(iPhone|iPod|iPad)", "")).match(window.navigator.userAgent);
	v._mediaRefCount = 0;
	v._detectBlobSupport = !0;
	u.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
	u.SHOULD_HIDE_MOBILE_BROWSER = window.top == window && (new W("Mobile(/.*)? Safari", "")).match(window.navigator.userAgent);
	w._detectSupport = !0;
	ga.USE_CACHE = !1;
	ga.USE_ENUM_INDEX = !1;
	ga.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
	P.DEFAULT_RESOLVER = B;
	P.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
	va.count = 0;
	ia.escapes = function() {
		var a = new E;
		a.set("lt", "<");
		a.set("gt", ">");
		a.set("amp", "&");
		a.set("quot", '"');
		a.set("apos", "'");
		a.set("nbsp", String.fromCharCode(160));
		return a
	}(this);
	gd.main()
})();