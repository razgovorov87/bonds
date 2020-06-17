import axios from 'axios';

const url = 'http://82.148.31.138:80/api/bonds';

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

    static RealTime(items) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                items.forEach(item => {
                    const newBond = data.find(bond => bond._id === item._id)
                    if(item.last_price !== newBond.last_price) {
                        resolve(data)
                        return
                    }
                });
            } catch (e) {
                reject(e);
            }
        })
    }
}

export default BondsService;