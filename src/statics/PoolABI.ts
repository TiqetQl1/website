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
				"name": "ticket_price_usdt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_of_participant",
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
		"name": "IntervalNotEnded",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LimitOfParticipents",
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
				"internalType": "enum Pool.Stage",
				"name": "current",
				"type": "uint8"
			},
			{
				"internalType": "enum Pool.Stage",
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
				"internalType": "enum Pool.Stage",
				"name": "new_stage",
				"type": "uint8"
			}
		],
		"name": "StageChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "buyTicket",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "codes",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
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
		"name": "configs",
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
				"name": "ticket_price_usdt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_of_participant",
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "drawLots",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "givePrizes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolTotal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "results",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "nft_holders_",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "winners_",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "winners_codes_",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "max_raised_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retriveHolders",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "states",
		"outputs": [
			{
				"internalType": "enum Pool.Stage",
				"name": "stage_",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "tickets_sold_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyers_count_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "raised_",
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
		"name": "tickets_of_participant",
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