class Monster {
	constructor(name, image, hp, type) {
		this.name = name;
		this.image = image;
		this.hp = hp;
		this.type = type;
	}

	getName() {
		return this.name;
	}

	getImage() {
		return this.image;
	}

	getHp() {
		return this.hp;
	}

	getType() {
		return this.type;
	}

	setHurt(damages) {
		this.hp -= damages;
	}

	isAlive() {
		if(this.hp > 0){
			return true;
		} else {
			return false;
		}
	}
}

export default Monster
