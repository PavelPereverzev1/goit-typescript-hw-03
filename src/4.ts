interface IKey {
  getSignature(): number;
}
class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }
  getSignature(): number {
    return this.signature;
  }
}

interface IPerson {
  getKey(): IKey;
}

class Person implements IPerson {
  private key: IKey;
  constructor(key: IKey) {
    this.key = key;
  }
  getKey(): IKey {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: IKey;
  protected tenants: IPerson[] = [];

  constructor(key: IKey) {
    this.key = key;
  }

  comeIn(person: IPerson): void {
    if (this.door) {
      this.tenants.push(person);
      console.log('Person came in.');
    } else {
      console.log('The door is closed.');
    }
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  openDoor(key: IKey): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('The door is open.');
    } else {
      console.log('The door steal closed.');
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
