const counters:{ [key: string]: CounterType } = {
    "1": { prefix: "A", counter: 1 },
    "2": { prefix: "B", counter: 1 },
    "3": { prefix: "C", counter: 1 }
};

type CounterType = {prefix: string, counter: number }

export function generateOrderId(id: string): string {
    const idGenerate:CounterType= counters[id]
    if (!idGenerate) {
        return "Invalid ID";
    }

    if (idGenerate.counter > 999) {
        idGenerate.counter = 1;
    }

    
    const result = `${idGenerate.prefix}${String(idGenerate.counter).padStart(3, '0')}`;
    idGenerate.counter++; 

    return result;
}