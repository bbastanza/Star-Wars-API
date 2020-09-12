const formatData = character => {
    character.heightFormatted = formatHeight(character);
    character.weight = formatWeight(character);
    return character;
};

const formatHeight = character => {
    let feet = Math.floor((character.height * 0.3937008) / 12);
    let inches = Math.round((character.height * 0.3937008) % 12);
    if (inches === 12) {
        feet += 1;
        inches = 0;
    }
    return isNaN(feet) && isNaN(inches) ? "unknown" : `${feet}' ${inches}"`;
};

const formatWeight = character => {
    return isNaN(Math.floor(character.mass * 2.204623)) ? "unknown" : Math.floor(character.mass * 2.204623);
};

export { formatData, formatHeight, formatWeight };
