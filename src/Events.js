class Events {
	callbacks = [];
	nextId = 0;

	// Emit Events
	emit(eventName, value) {
		this.callbacks.forEach((stored) => {
			if (stored.eventName === eventName) {
				stored.callback(value);
			}
		});
	}

	// Subscribe
	on(eventName, caller, callback) {
		this.nextId += 1;

		this.callbacks.push({
			id: this.nextId,
			eventName,
			caller,
			callback
		});

		return this.nextId;
	}

	// Unsubscribe Methods
	off(id) {
		this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
	}
	unsubscribe(caller) {
		this.callbacks = this.callbacks.filter(
			(stored) => stored.caller !== caller
		);
	}
}

// The entire game will share one "events" instance.
export const events = new Events();
