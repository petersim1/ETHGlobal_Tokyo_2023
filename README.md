# ETH Global Tokyo April 2023

## Collaborators
- Peter Simone
- Blake Hatch

## Overview
On-chain SAFT agreements and money movement. Bridging the web2/3 gap in document signing, escrow, ownership, and money movement.

## Why?
Idea is to specifically target the SAFT legal framework, and attempt to bring these representations and their corresponding money movement on TDE on-chain.

## How?
We need to make this as web2 friendly as possible. Including social login, fiat on-ramp, and having a slick UX with clear representation of document signing status, vesting periods, and legalities.

## Tools/Partners?
- Metamask SDK for handling wallet connections (coupled with ethers.js for contract events, listeners, etc...)
- SAFE for their Auth Kit, enabling social login
- SuperFluid for vesting periods and streaming of assets upon TDE / cliff dates.
- ETH foundation (contract abstraction, mainly), for being able to abstract away repetitive signing, enable gasless, multisig
- Deploy on polygon zkEVM, include compatibility with other chains as well
- The Graph Protocol to spin up hosted services for our contracts, so we can get decentralized graphQL queryable data (rather than storing a digital twin off-chain, or reading from contract directly on each render)

- ETH scaffold -> look at Trampoline for frontend tools + UI components/inspiration
