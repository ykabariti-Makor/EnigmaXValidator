//version 1 - separator is a comma or a white space

function tagSplitter(str){

    //the separator is either white space of any type or a comma
    let regSeparator = /\s|,/; 
    const tags = str.split(regSeparator);
    //otherwise, empty strings might be returned as words - space after comma results in that
    filteredTags = tags.filter(item => item !== ""); 
    return filteredTags;
    
}

//Version 2 - separator is inferred from input string - the character that shows up the most that is neither a digit nor an alphanumeric character

function tagSplitter2(str, userSeparator){
    let inferredSeparator;
    if(userSeparator){
        inferredSeparator = userSeparator;
    }else{
        //No separator is supllied- it should be inferred from given str
        const regSeparatorCandidates = /\W/g; 
        //Capturing all special characers- these are the candidates for the separator (with dupicates)
        const strangeChars = [...str.matchAll(regSeparatorCandidates)].map(item => item[0]);

        //Counting frequncy for each candidate
        const countsObj = strangeChars.reduce((accumulator, current) => {
            accumulator[current] = accumulator[current]
                 ? accumulator[current] +=1 
                 : accumulator[current] = 1
            return accumulator
         },{});
         const countsArr = Object.entries(countsObj)
        if(countsArr.length > 1){
             //If there are several candidates for separators - sort according to count
             countsArr.sort((a,b) => b[1] - a[1]);         
        }
        //saving either the only candidate or the candidate with highest count
        inferredSeparator = countsArr[0][0];
    }

    //moving from the separator as a string to a regex that represent it correctly

    let inferredReg;
    if(inferredSeparator === " "){
        inferredReg = /\s/
    }else if([".", "*", "?", "$", "^", "(", ")"].includes(inferredSeparator)){
        //All these special chars need a backslash before them to be read literally
        inferredReg = new RegExp(`\\${inferredSeparator}`)
    }else{
        inferredReg = new RegExp(inferredSeparator)
    }
    
    const tags = str.split(inferredReg);
    return tags;
}

