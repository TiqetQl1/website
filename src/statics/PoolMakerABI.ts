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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "active_pools",
		"outputs": [
			{
				"internalType": "contract Pool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "needle",
				"type": "address"
			}
		],
		"name": "admin_index",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "all_actives",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "closed_pools",
		"outputs": [
			{
				"internalType": "contract Pool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
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
		"name": "drop_pool",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "percent_per_nft",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "percent_per_winner",
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
		"name": "transfer_god",
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