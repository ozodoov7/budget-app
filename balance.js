const {readData} = require("./index")

function getBalance(){
    const income=readData("income.json")
    const expanse=readData("expanse.json")

    const totalIncome = income.reduce((acc, curr) => acc+(curr.amount || 0), 0)

    const totalExpanse = expanse.reduce((acc, curr) => acc+(curr.amount || 0), 0)

    const currBalance = totalIncome - totalExpanse

    const flag = process.argv[2]

    if(flag === "--more"){
        console.log("\n--- Daromadlar ---")
        console.table(income)
        
        console.log("\n--- Xarajatlar ---")
        console.table(expanse)

        console.log("\n--- Umumiy Balans ---")
        console.table([
            {
                "Jami Daromad" : totalIncome,
                "Jami Xarajat" : totalExpanse,
                "Joriy Balans" : currBalance
            }
        ])
    } else {
        console.table([{
            "Joriy balans" : currBalance
        }])
    }
}
getBalance()