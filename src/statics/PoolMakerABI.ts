const PoolMakerABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "NotAuthorized",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "PoolArchived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "PoolCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "PoolRemoved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "GOD",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allActives",
		"outputs": [
			{
				"internalType": "contract Pool[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allArchived",
		"outputs": [
			{
				"internalType": "contract Pool[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "old_admin",
				"type": "address"
			}
		],
		"name": "demote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "should_archive",
				"type": "bool"
			}
		],
		"name": "dropPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "importPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "toCheck",
				"type": "address"
			}
		],
		"name": "isAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "organizer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "time_end",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticket_price_wei",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_per_participant",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winners_count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cut_share",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cut_per_nft",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cut_per_winner",
				"type": "uint256"
			}
		],
		"name": "newPool",
		"outputs": [
			{
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_admin",
				"type": "address"
			}
		],
		"name": "promote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ngod",
				"type": "address"
			}
		],
		"name": "transferGod",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default PoolMakerABI