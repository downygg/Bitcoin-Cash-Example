var express = require('express');
const {BCH} = require('./BCH.js');

app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(express.json());
app.use(bodyparser.json());

app.get('/:network/generate', (req,res) => {
    network = req.params.network;
    if(network == 'mainnet' || network == 'testnet')
    {
        const bch = new BCH(network);
        try {
            bch.generateWallet().then(ok => {
                res.status(200).json({'status' : true, "data" : {
                    address : ok.address,
                    wif : ok.privateKeyWif,
                    mnemonic: ok. mnemonic
                }});
            }).catch(er => {
                res.status(400).json({'status' : false, "message" : er.message});
            })
            
        } catch(e) {
            res.status(400).json({'status' : false, "message" : e.message});
        }
    } else {
        res.status(400).json({'status' : false, "message" : "Check chain network."});
    }
    
});

app.post('/:network/balance', (req,res) => {
    network = req.params.network;
    if(network == 'mainnet' || network == 'testnet')
    {
        const bch = new BCH(network);
        try {
            bch.balanceCheck(req.body.address).then(ok => {
                res.status(200).json({
                    status: true,
                    address: req.body.address,
                    balance: ok
                })
            }).catch(er => {
                res.status(400).json({'status' : false, "message" : er.message});
            })
            
        } catch(e) {
            res.status(400).json({'status' : false, "message" : e.message});
        }
    } else {
        res.status(400).json({'status' : false, "message" : "Check chain network."});
    }
});

app.post('/:network/transfer', (req,res) => {
    network = req.params.network;
    if(network == 'mainnet' || network == 'testnet')
    {
        const bch = new BCH(network);
        try {
            let wif = req.body.wif;
            let to = req.body.to;
            let amount = (req.body.amount*100000000).toFixed(0);
            bch.transfer(wif,to,amount).then(ok => {
                res.status(200).json({
                    status: true,
                    data : {
                        txid:ok.txId,
                        explorer: ok.explorerUrl   
                    }
                    
                })
            }).catch(er => {
                res.status(400).json({'status' : false, "message" : er.message});
            })
            //res.status(400).json({'status' : false, "message" : "ok"});
        } catch(e) {
            res.status(400).json({'status' : false, "message" : e.message});
        }
    } else {
        res.status(400).json({'status' : false, "message" : "Check chain network."});
    }
})

app.get('/', (req,res) => {
    res.status(200).json({'status' : false, "message" : "mantap"});
});

var port = 3000;
app.listen(port);
console.log(`LISTENING PORT ${port}`);