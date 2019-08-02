const ephemeral = (target, ttl = 60) => {
    const CREATED_AT = Date.now();
    const isExpired = () => Date.now() - CREATED_AT > ttl * 1000;

    return new Proxy(target, {
        get: (obj, prop) => (isExpired() ? undefined : Reflect.get(obj, prop))
    });
}

let bankAccount = ephemeral({
        balance: 14.93
    },
    10
);

console.log(bankAccount.balance); // 14.93

setTimeout(() => {
    console.log(bankAccount.balance); // undefined
}, 10 * 1000);