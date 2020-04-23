import axios from 'axios';

const url = 'http://82.148.18.12:80/api/bonds';

class BondsService {
    //get
    static getBonds() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(bond => ({
                    ...bond
                })));
            } catch (e) {
                reject(e);
            }
        })
    }

    //create


    //delete
}

export default BondsService;