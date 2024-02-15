async function fetchLocalJson(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(
                `Falha na requisição: ${response.status} ${response.statusText}`
            );
        }
        const jsonObject = await response.json();
        return jsonObject;
    } catch (error) {
        console.error("Ocorreu um erro ao obter o arquivo JSON:", error);
    }
}

function getUniqueValuesByKey(objectsArray, keyName) {
    const uniqueValues = new Set();

    for (const obj of objectsArray) {
        if (obj.hasOwnProperty(keyName)) {
            uniqueValues.add(obj[keyName]);
        } else {
            throw new Error(`Chave inválida: ${keyName}`);
        }
    }

    return Array.from(uniqueValues);
}

function groupByUniqueValue(objectsArray, keyName, uniqueValuesArray) {
    const resultArray = [];

    for (const value of uniqueValuesArray) {
        const groupedObject = { [keyName]: value };
        for (const obj of objectsArray) {
            if (obj[keyName] === value) {
                for (const key in obj) {
                    if (key !== keyName) {
                        if (!groupedObject.hasOwnProperty(key)) {
                            groupedObject[key] = [];
                        }
                        groupedObject[key].push(obj[key]);
                    }
                }
            }
        }
        resultArray.push(groupedObject);
    }

    return resultArray;
}

export const obterTubos = async (file) => {
    const pipes = await fetchLocalJson(file);
    const type_materials = getUniqueValuesByKey(pipes, "material");
    const materials = groupByUniqueValue(pipes, "material", type_materials);
    return materials;
};
