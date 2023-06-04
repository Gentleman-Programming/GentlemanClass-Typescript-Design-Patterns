// Interface Segregation Principle
interface CanWalk {
  walk(distance: number): void;
}

interface CanSwim {
  swim(distance: number): void;
}

interface Animal extends CanWalk, CanSwim {
  eat(): void;
  sleep(): void;
}

class Dog implements Animal {
  walk(distance: number): void {
    console.log(`Dog walks ${distance} meters`);
  }

  swim(distance: number): void {
    console.log(`Dog swims ${distance} meters`);
  }

  eat(): void {
    console.log("The dog is eating");
  }

  sleep(): void {
    console.log("The dog is sleeping");
  }
}

class Fish implements CanSwim {
  swim(distance: number): void {
    console.log(`The Fish is swiming ${distance} meters`);
  }
}

// DECORATOR PATTERN

interface Component {
  operation(): string;
}

class ConcretComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  constructor(protected component: Component) { }

  public operation(): string {
    return this.component.operation();
  }
}

class ComponentDecorator extends Decorator {
  public operation(): string {
    return `ComponentDecorator(${super.operation()})`;
  }
}

const component = new ConcretComponent();
const decorator = new ComponentDecorator(component);
decorator.operation(); // ComponentDecorator(ConcreteComponent);

// SINGLETON PATTERN

class Database {
  private static instance: Database;

  private constructor() { }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public query(query: string): void {
    console.log(`Executing query: ${query}`);
  }
}

const db = Database.getInstance();
db.query("Gestioname Esta");

// ADAPTER PATTERN

interface OldJoystick {
  connectToPort(): void;
  readInputs(): number;
}

class OldJoystickImp implements OldJoystick {
  public connectToPort(): void {
    console.log("Connecting to port");
  }
  public readInputs(): number {
    console.log("Reading the old joistick inputs");
    return Math.floor(Math.random() * 256);
  }
}

interface USBJoystick {
  connectToUSB(): void;
  readData(): number;
}

class USBJoystickImp implements USBJoystick {
  public connectToUSB(): void {
    console.log("Connecting to usb");
  }

  public readData(): number {
    console.log("Reading from USB");
    return Math.floor(Math.random() * 256);
  }
}

class JoystickAdapter implements USBJoystick {
  constructor(private oldJoystickImp: OldJoystickImp) { }

  public connectToUSB(): void {
    this.oldJoystickImp.connectToPort();
  }

  public readData(): number {
    return this.oldJoystickImp.readInputs();
  }
}
const oldJoystick = new OldJoystickImp();
const oldJoystickWithAdapter = new JoystickAdapter(oldJoystick);

// BUILDER PATTERN

enum CharacterTypes {
  "MAGE" = "mage",
  "WARRIOR" = "warrior",
  "ROUGE" = "rouge",
}

class Character {
  level: number;
  strength: number;
  agility: number;
  intelligence: number;
  defense: number;
  constructor(private name: string, private classType: CharacterTypes) { }

  displayStats(): void {
    console.log(`Name: ${this.name}`);
    console.log(`Level: ${this.level}`);
    console.log(`Class Type: ${this.classType}`);
    console.log(`Agility: ${this.agility}`);
    console.log(`Defense: ${this.defense}`);
    console.log(`Intelligence: ${this.intelligence}`);
    console.log(`Strength: ${this.strength}`);
  }
}

class CharacterBuilder {
  private character: Character;

  constructor(name: string, characterType: CharacterTypes) {
    this.character = new Character(name, characterType);
  }

  setLevel(level: number) {
    this.character.level = level;
    return this.character;
  }

  setStrength(strength: number) {
    this.character.strength = strength;
    return this.character;
  }

  setAgility(agility: number) {
    this.character.agility = agility;
    return this.character;
  }

  setIntelligence(intelligence: number) {
    this.character.intelligence = intelligence;
    return this.character;
  }

  setDefense(defense: number) {
    this.character.defense = defense;
    return this.character;
  }

  build(): Character {
    return this.character;
  }
}

const warriorBuilder = new CharacterBuilder(
  "Gentleman",
  CharacterTypes.WARRIOR
);

warriorBuilder.setLevel(10)
warriorBuilder.setDefense(235)
warriorBuilder.setIntelligence(10)
warriorBuilder.setAgility(10)
warriorBuilder.setStrength(1000)
const warrrior = warriorBuilder.build();
