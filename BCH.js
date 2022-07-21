const bch = require('mainnet-js');

class BCH {
    
    constructor(network) {
        if(network == "mainnet") {
            this.chain = bch.Wallet;
        } else if (network == "testnet") {
            this.chain = bch.TestNetWallet;
        } else {
            this.chain = null;
        }
    }

    generateWallet() {
        return this.chain.newRandom();
    }

    async balanceCheck(address) {
        const bal = await this.chain.fromCashaddr(address);
        return bal.getBalance('bch');
    }

    async transfer(wif,to,amount) {
        const sender = await this.chain.fromWIF(wif);
        const txdata = await sender.send([{
                        cashaddr: to,
                        value: amount,
                        unit: "sat"
                    }]);
        return txdata;
    }


}

module.exports = { BCH }