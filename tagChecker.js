function tagSplitter(str){

    //the separator is either white space of any type or a comma
    let regSeparator = /\s|,/; 
    tags = str.split(regSeparator);
    //otherwise, empty strings might be returned as words - space after comma results in that
    filteredTags = tags.filter(item => item !== ""); 
    return filteredTags;
    
}