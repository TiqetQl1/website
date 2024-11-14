const PoolABI = [
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
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "current",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expected",
				"type": "uint256"
			}
		],
		"name": "InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "current",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expected",
				"type": "uint256"
			}
		],
		"name": "IntervalNotEnded",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "organizer",
				"type": "address"
			}
		],
		"name": "NotAuthorized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TryAgainLater",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "enum Pool.State",
				"name": "current",
				"type": "uint8"
			},
			{
				"internalType": "enum Pool.State",
				"name": "expected",
				"type": "uint8"
			}
		],
		"name": "WrongStage",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "total_after_transaction",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max",
				"type": "uint256"
			}
		],
		"name": "noTicketsLeft",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Buy",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Raise",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "enum Pool.State",
				"name": "new_state",
				"type": "uint8"
			}
		],
		"name": "StateChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_organizer",
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
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "buy_ticket",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "codes",
				"type": "uint256[]"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "close",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "config",
		"outputs": [
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
			},
			{
				"internalType": "enum Pool.State",
				"name": "state_",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "draw_lots",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "give_prizes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pool_total",
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
		"name": "start",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum Pool.State",
				"name": "",
				"type": "uint8"
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
		"name": "tickets",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tickets_per_participant",
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
		"name": "tickets_total",
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
		"name": "total_participants",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winners",
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
		"name": "winners_codes",
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
		"name": "withdrawAllLeft",
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

export default PoolABI