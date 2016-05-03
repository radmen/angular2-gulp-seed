interface Person {
	name: string;
}

function greeter(who: Person) {
	console.log(`Hello ${who.name}`);
}

const john = {
	name: 'john',
}

greeter(john);
