"use strict";

/*
	rockethands.js
	system

	Created by Cain Kilgore on 30/06/2017
	Copyright 2017 High Fidelity, Inc.

	Distributed under the Apache License, Version 2.0.
	See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

(function() {
	var isRocketing = false;
	
	function checkRocketing() {
		if (HMD.active) {
			if (Controller.Hardware.Vive || Controller.Hardware.OculusTouch) {
				var leftHand = Controller.getPoseValue(Controller.Standard.LeftHand);
				var rightHand = Controller.getPoseValue(Controller.Standard.RightHand);
				var leftWorldControllerPos = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, leftHand.translation));
				var rightWorldControllerPos = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, rightHand.translation));
				var hipPosition = MyAvatar.getJointPosition("Hips");
				var controllerHipThreshold = 0.1;
				var controllerRotationThreshold = 0.25;
				
				if ((leftWorldControllerPos.y > (hipPosition.y - controllerHipThreshold)) && (leftWorldControllerPos.y < (hipPosition.y + controllerHipThreshold)) && rightWorldControllerPos.y > (hipPosition.y - controllerHipThreshold) && (rightWorldControllerPos.y < (hipPosition.y + controllerHipThreshold))) {
					if (leftHand.rotation.y < controllerRotationThreshold && leftHand.rotation.y > -controllerRotationThreshold && rightHand.rotation.y < controllerRotationThreshold && rightHand.rotation.y > -controllerRotationThreshold) {
						isRocketing = true;
						MyAvatar.motorReferenceFrame = "world";
						var moveVector = Vec3.multiply(Quat.getFront(Camera.getOrientation()), 10);
						if (!MyAvatar.isFlying()) {
							moveVector = Vec3.sum(moveVector, {x: 0, y: 1, z: 0});
						}
						MyAvatar.motorVelocity = moveVector;
						MyAvatar.motorTimescale = 1.0;
					} else {
						checkCanStopRocketing();
					}
				} else {
					checkCanStopRocketing();
				}
			}
		} else {
			checkCanStopRocketing();
		}
	};
	
	function checkCanStopRocketing() {
		if(isRocketing) {
			MyAvatar.motorVelocity = 0;
			isRocketing = false;
		}
	}
	Script.update.connect(checkRocketing);
}());