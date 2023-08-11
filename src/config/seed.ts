import { availableParallelism } from "os";
import { UserSchema, WeightSchema } from "../models/schema/index.schema";

const xlsx = require('xlsx');

const saveUsers = async () : Promise<void> => {
    try {        
        const path = "src/config/BASE DE DATOS 2023 - JULIO-23.xlsx"
        const excel = xlsx.readFile(path)

        const worksheet = excel.Sheets[excel.SheetNames[0]]

        for(let i = 2; i < 10023; i++){
            let name = worksheet[`C${i}`]
            let email = worksheet[`D${i}`]
            let username = worksheet[`E${i}`]
            let location = worksheet[`F${i}`]
            let age = worksheet[`G${i}`]
            let initialWeight = worksheet[`H${i}`]
            let height = worksheet[`I${i}`]
            let objective = worksheet[`J${i}`]
            let derivation = worksheet[`K${i}`]
            let payment = worksheet[`P${i}`]
            let phone = worksheet[`Q${i}`] 
    
            
            let firstName : string | null = ""
            let lastname : string | null = ""
        
            function isValidEmail(email : string) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(email);
            }
        
        if(!name || typeof name.v !== 'string' || isValidEmail(name.v)){
            name = null
        }else{
           name = name.v.toLowerCase();
           if(name){
            const split = name.split(" ")
            let finalSplit = ''
            for(let i = 0; i < split.length; i++){
              if(typeof(split[i][0])== 'string'){
                let cutWords = split[i].split("")
                cutWords[0] = cutWords[0].toUpperCase()
                cutWords = cutWords.join("")
                if(finalSplit === ''){
                  finalSplit = cutWords
                }else{
                  finalSplit = `${finalSplit} ${cutWords}`
                }
              }
            }
            if(finalSplit === ''){
              name = null
              firstName = null
              lastname = null
            }else{
              const splitAgain = finalSplit.split(" ")
              name = finalSplit
              firstName = splitAgain[0]
              lastname = splitAgain[splitAgain.length - 1] 
            }
           }
            
            
        }

        if(!email){
            email = null;
        }else{
            email = email.v.split(" ")[0]
            const res = isValidEmail(email)
            if(!res){
                email = null
            }
            else{
                email = `${email}`;
            }
            
        }

        if(!username || username.v == 42){
            username = null
        }else{
            username = `@${username.v.toLowerCase().split(" ")[0]}`;
        }

 
        

        if(!location || typeof location.v !== 'string'){
            location = null
        }
        else{
            location = location.v
        }

        function getFirstDayOfYear(year: number) {
            // Create a Date object for January 1 of the specified year
            const firstDay = new Date(year, 0, 1);
            return firstDay;
          }


        if(!age){
            age = null
        }else{     
            if(typeof age.v === 'string'){
                const heightRegex = /(\d+(\.\d+)?)/;
                const match = age.v.match(heightRegex);
                if (match) {
                  // Convert the matched value to a number and then to an integer
                  let year = 2023 - parseInt((parseFloat(match[0])).toString(), 10);
                  if(year < 1900 || year > 2005){
                    year = 2000
                  }
                  age = getFirstDayOfYear(year) // Multiply by 100 to remove the decimal point
            
                } else {
                    age = null;
                }
            }else{
                let year = 2023 - age.v
                if(year < 1900 || year > 2005){
                    year = 2000
                }
                age = getFirstDayOfYear(year)
            }
        }

        if(!initialWeight){
            initialWeight = null
        }else{
            if(typeof initialWeight.v === 'string'){
                const weightRegex = /(\d+(\.\d+)?)/;
                const match = initialWeight.v.match(weightRegex)
                if(match){
                    initialWeight = parseInt(match[0], 10);
                }
                else{
                    initialWeight = null
                }
            }
            else {
                initialWeight = parseInt(initialWeight.v, 10);
            }

            let length = String(initialWeight).split("").length
            if(length == 2 || length === 3){
                initialWeight = Number(`${initialWeight}000`)
            }
          
        }

if (!height || height.v == 42) {
  height = null;
} else {
  if (typeof height.v === 'string') {
    // Remove any non-numeric characters (like 'm' or 'cm')
    const heightRegex = /(\d+(\.\d+)?)/;
    const match = height.v.match(heightRegex);
    if (match) {
      // Convert the matched value to a number and then to an integer
      height = parseInt((parseFloat(match[0]) * 100).toString(), 10); // Multiply by 100 to remove the decimal point

    } else {
      height = null;
    }
  } else {
    height = parseInt((height.v * 100).toString(), 10); // Convert to an integer and multiply by 100 to remove the decimal point

  }
  let length = String(height).split("").length
  if(length === 5){
    height = Number(String(height).slice(0, 3));
  }
  else if(length > 3){
    height = null
  }

}

        if(!objective){
            objective = null
        }else{
            if(typeof objective.v === 'string'){
                const objectiveRegex = /(\d+(\.\d+)?)/;
                const match = objective.v.match(objectiveRegex);
                if(match){
                    objective = parseInt(match[0])
                }else{
                    objective = null
                }
            }else{
                objective = objective.v
            }
         
        }


        if(!derivation){
            derivation = null
        }else{
            if(typeof derivation.v === 'number'){
                derivation = null
            }else{
                derivation = derivation.v
            }
        }


        if(!payment){
            payment = null
        }else{
            if(typeof payment.v === 'number'){
                payment = null
            }else{
                payment = payment.v
            }
        }

        if (!phone) {
            phone = null;
          } else {
            if (typeof phone.v === 'string') {
              // Remove all non-numeric characters from the phone number using a regular expression
              const phoneRegex = /\d+/g;
              const match = phone.v.match(phoneRegex);
              if (match) {
                // Join the matched digits together to form the phone number as a string
                phone = Number(match.join(''))
              } else {
                phone = null;
              }
            } else {
              phone = null; // If it's not a string, set phone to null
            }

            let length = String(phone).split("").length
            if(length > 13){
              phone = null
              
              
          }
        }

        let lastUserId: number = await UserSchema.max("id");
        if (!lastUserId) {
          lastUserId = 0;
        }
        lastUserId = lastUserId + 1

          

          const user = {
            id: lastUserId,
            name: firstName,
            lastname: lastname,
            fullName: name,
            email: email,
            location: location,
            phone: phone,
            height: height,
            actual_match: false,
            premiun: false,
            score: 0,
            salt: "",
            birth_date: age,
            dni: null,
            username: username,
            admin: false,
            superAdmin: false,
            deleted: false,
            avatar: 'https://sirenas-media-bucket.s3.amazonaws.com/sirenas/assets/default/user/conejoEstofado.jpg'
          };

          
  
          if(email && username){
           const userFoundByEmail = await UserSchema.findOne({where: {email: email}})
           const userFoundByUsername = await UserSchema.findOne({where: {username: username}})
           if(!userFoundByEmail && !userFoundByUsername){
         const seededUser = await UserSchema.create(user)
         if(initialWeight && objective){
          const nowWeight : number = Number(initialWeight) / 1000
          const FutrureWeight : number = Number(objective)
          if(nowWeight > FutrureWeight){
            const weight = await WeightSchema.create({current_weight: nowWeight, objective_weight: FutrureWeight, UserId: seededUser.dataValues.id, created_at: new Date(), updated_at: new Date()})  
          }
    
        }
           }
          }else{
            console.log("user null");
            
          }
        
    }
        
    } catch (error) {
        console.log(error);
    }
}






const executor = async () => {
const user = await UserSchema.findAll()
if(!user[0]){
   await saveUsers()
}else{
    console.log(user);
}

}


const deleteUser = async () => {
    const deletedUsers = await UserSchema.destroy({
      where: {}, // Empty object as condition to delete all records
    });
    const deleteWeights = await WeightSchema.destroy({
      where: {}
    })
    console.log(deletedUsers, deleteWeights);
    
  };


   executor()
  

/*   deleteUser() */