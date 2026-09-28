const fs =require("fs")

function readData(fileName){
    if(!fs.existsSync(fileName)) fs.writeFileSync(fileName, "[]")
        return JSON.parse(fs.readFileSync(fileName, 'utf-8') || '[]')
}

function writeData(fileName, data){
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
}

function getKeyValues(args){
    const res={}
    args.forEach(item=>{
        const [key, value] = String(item).split("=")
        if(key&&value) res[key]=value
    })
    return res
}

function toOrganize(fileName, idKey){
    const [method, ...args] = process.argv.slice(2)
    let data = readData(fileName)

    switch(method?.toUpperCase()){
        case "GET":
            console.table(data)
            break
        
        case "POST":{
            const [amount, ...purposeArr] = args
            const purpose = purposeArr.join(" ")
            
            if(!amount || !purpose){
                return console.log("Xatolik")
            }
            
            const newItem = {
                [idKey]: Date.now().toString(),
                amount : Number(amount),
                purpose
            }
            
            data.push(newItem)
            writeData(fileName, data)
            
            console.log("Qo'shildi")
            console.table([newItem])
            break;
        }

        case "DELETE": {
            const id = args[0]
            const len=data.length

            data=data.filter(item => item[idKey] !== id)

            if(data.length===len){
                return console.log(`Xatolik`)
            }

            writeData(fileName, data)
            return console.log(`${id} deleted`)
        }

        case "PUT":{
            const id = args[0]

            const updates = getKeyValues(args.slice(1))

            const index = data.findIndex(item => item[idKey] == id)

            if(index === -1){
                return console.log(`Xato ${id}`)
            }
            
            if (updates.amount){
                const newAmount = Number(updates.amount)
                if(!isNaN(newAmount)){
                    data[index].amount=newAmount
                } else {
                    console.log("Xatolik to'g'ri son kiriting")
                }
            } 
            if (updates.purpose) data[index].purpose = updates.purpose

            writeData(fileName, data)
            console.log("Yangilandi")
            console.table([data[index]])
            break;

        }   

        default:
            console.log("XATOLIK!!!")
    }

}

module.exports = {readData, toOrganize}