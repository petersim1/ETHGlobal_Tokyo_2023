const NDA = [
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "This Non-Disclosure Agreement ('Agreement') is entered into and made effective as of the \
        date of electronic acceptance by the Receiving Party (as defined below), by and between",
      },
      {
        type: "text",
        variable: true,
        field: "disclosing_party",
      },
      {
        type: "text",
        variable: false,
        text: "(the ('Disclosing Party'), and",
      },
      {
        type: "text",
        variable: true,
        field: "receiving_party",
      },
      {
        type: "text",
        variable: false,
        text: "(the 'Receiving Party').",
      },
    ],
  },
  {
    type: "ol",
    items: [
      {
        type: "text",
        variable: false,
        text: "Definition of Confidential Information. For purposes of this Agreement, 'Confidential \
        Information' shall \
        include all information or material that has or could have commercial value or other utility \
        in the business \
        in which Disclosing Party is engaged. If the Confidential Information is in written form, \
        the Disclosing Party \
        shall label or stamp the materials with the word 'Confidential' or some similar warning. \
        If Confidential \
        Information is transmitted orally, the Disclosing Party shall promptly provide writing \
        indicating that such \
        oral communication constituted Confidential Information.",
      },
      {
        type: "text",
        variable: false,
        text: "Exclusion of Confidential Information. Receiving Party's obligations under this Agreement \
        do not extend to \
        information that is: (a) publicly known at the time of disclosure or subsequently becomes \
        publicly known \
        through no fault of the Receiving Party; (b) discovered or created by the Receiving Party \
        before disclosure \
        by Disclosing Party; (c) learned by the Receiving Party through legitimate means other \
        than from Disclosing \
        Party or Disclosing Party's representatives; or (d) is disclosed by Receiving Party with \
        Disclosing Party's \
        prior written approval",
      },
      {
        type: "text",
        variable: false,
        text: "Obligations of Receiving Party. Receiving Party shall hold and maintain the Confidential \
        Information in \
        strictest confidence for the sole and exclusive benefit of the Disclosing Party. \
        Receiving Party shall \
        carefully restrict access to Confidential Information to employees, contractors and third \
        parties as is \
        reasonably required and shall require those persons to sign nondisclosure restrictions at least as \
        protective as those in this Agreement. Receiving Party shall not, without the \
        Disclosing Party's prior \
        written approval, use, copy, or disclose any Confidential Information. Receiving \
        Party shall return to \
        Disclosing Party any and all records, notes, and other written, printed, or tangible \
        materials in its \
        possession pertaining to Confidential Information immediately if Disclosing Party requests it in \
        writing.",
      },
      {
        type: "text",
        variable: false,
        text: "Time Periods. The nondisclosure provisions of this Agreement shall survive the \
        termination of this \
        Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in \
        effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing \
        Party sends written notice releasing Receiving Party from this Agreement, whichever occurs first.",
      },
      {
        type: "text",
        variable: false,
        text: "Relationships. This Agreement does not create any partnership, joint venture, \
        or agency relationship.",
      },
      {
        type: "text",
        variable: false,
        text: "Severability. If a court finds any provision of this Agreement invalid or unenforceable, the \
        remainder of this Agreement shall be interpreted so as best to affect the intent of the parties.",
      },
      {
        type: "text",
        variable: false,
        text: "Integration. This Agreement expresses the complete understanding of the parties regarding its \
        subject matter and supersedes all prior proposals, agreements, representations, and understandings. \
        This Agreement may not be amended except in writing signed by both parties.",
      },
      {
        type: "text",
        variable: false,
        text: "Waiver. The failure to exercise any right provided in this Agreement shall not be a waiver of \
        prior or subsequent rights.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Waiver. The failure to exercise any right provided in this \
        Agreement shall not be a waiver of prior or subsequent rights.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "IN WITNESS WHEREOF, the parties have executed this Agreement \
        through their authorized representatives.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "DISCLOSING PARTY:",
      },
    ],
  },
  {
    type: "signature",
    items: [
      {
        type: "signature",
        variable: true,
        field: "disclosing_sign",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "RECEIVING PARTY:",
      },
    ],
  },
  {
    type: "signature",
    items: [
      {
        type: "signature",
        variable: true,
        field: "receiving_sign",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "ELECTRONIC ACCEPTANCE",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "I,",
      },
      {
        type: "text",
        variable: true,
        field: "disclosing_party",
      },
      {
        type: "text",
        variable: false,
        text: "on behalf of",
      },
      {
        type: "text",
        variable: true,
        field: "receiving_party",
      },
      {
        type: "text",
        variable: false,
        text: "hereby acknowledge and agree to the terms of the above Non-Disclosure Agreement, \
        and agree to use the Confidential Information only for the purposes outlined in this Agreement.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "By accepting this Agreement, I confirm that I am authorized to enter into this \
        Agreement on behalf of",
      },
      {
        type: "text",
        variable: true,
        field: "receiving_party",
      },
      {
        type: "text",
        variable: false,
        text: "and that this Agreement is binding on the Receiving Party.",
      },
    ],
  },
];

const SAFT = [
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "YOU RECEIVING AND RETAINING THIS DOCUMENT THAT YOU WARRANT TO THE \
        COMPANY, ITS DIRECTORS, AND ITS OFFICERS THAT YOU ARE A RELEVANT PERSON.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: true,
        field: "token_name",
      },
      {
        type: "text",
        variable: false,
        text: ", a product of",
      },
      {
        type: "text",
        variable: true,
        field: "disclosing_party",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "SAFT",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "(Simple Agreement for Future Tokens)",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "THIS CERTIFIES THAT in exchange for the payment by the undersigned purchaser (the\
        'Purchaser') of $",
      },
      {
        type: "text",
        variable: true,
        field: "purchase_amount",
      },
      {
        type: "text",
        variable: false,
        text: " (the “Purchase Amount”) on or about ",
      },
      {
        type: "text",
        variable: true,
        field: "date",
      },
      {
        type: "text",
        variable: false,
        text: ",",
      },
      {
        type: "text",
        variable: true,
        field: "receiving_party",
      },
      {
        type: "text",
        variable: false,
        text: ", a",
      },
      {
        type: "text",
        variable: true,
        field: "receiving_state",
      },
      {
        type: "text",
        variable: false,
        text: "corporation (the “Company”), hereby issues to the Purchaser \
        the right (the “Right”) to certain units of",
      },
      {
        type: "text",
        variable: true,
        field: "token_name",
      },
      {
        type: "text",
        variable: false,
        text: "(the “Token” or “[Token Name]”), subject to the terms set forth below.",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Events",
      },
    ],
  },
  {
    type: "ol",
    items: [
      {
        type: "text",
        variable: false,
        text: "Network Launch. If there is a Network Launch before the expiration or termination \
        of this instrument, the Company will automatically issue to the Purchaser a number of units of \
        the Token equal to the Purchase Amount divided by the Discount Price\
        \nIn connection with and prior to the issuance of Tokens by the Company to the Purchaser \
        pursuant to this Section 1(a):\n\n\
        (i) The Purchaser will execute and deliver to the Company any and all other\
        transaction documents related to this SAFT, including verification of accredited investor status\
        or non-U.S. person status under the applicable securities laws; and\n\n\
        (ii) The Purchaser will provide to the Company a network address for which to \
        allocate Purchaser's Tokens upon the Network Launch.",
      },
      {
        type: "text",
        variable: false,
        text: "Dissolution Event. If there is a Dissolution Event before this instrument expires or \
        terminates, the Company will pay an amount equal to the Purchase Amount multiplied by the \
        Discount Rate (the “Discounted Purchase Amount”), due and payable to the Purchaser \
        immediately prior to, or concurrent with, the consummation of the Dissolution Event[, subject to \
        the rights and preferences of the holders of the Company’s preferred stock, as set forth in the \
        Company’s Certificate of Incorporation, as it may be amended from time to time.]1 If immediately \
        prior to the consummation of the Dissolution Event, the assets of the Company that remain \
        legally available for distribution to the Purchaser and all holders of all other SAFTs (the \
        “Dissolving Purchasers”), as determined in good faith by the Company’s board of directors, \
        are insufficient to permit the payment to the Dissolving Purchasers of their respective \
        Discounted Purchase Amounts, then the remaining assets of the Company legally available for \
        distribution, following all distributions to the holders of the Company’s preferred stock, will be \
        distributed with equal priority and pro rata among the Dissolving Purchasers in proportion to the \
        Discounted Purchase Amounts they would otherwise be entitled to receive pursuant to this \
        Section 1(b). Any distributed amounts shall be in U.S. Dollars",
      },
      {
        type: "text",
        variable: false,
        text: "Termination.  This instrument will expire and terminate upon the earlier of (i) the \
        issuance of Tokens to the Purchaser pursuant to Section 1(a); (ii) the payment, or setting aside \
        for payment, of amounts due the Purchaser pursuant to Section 1(b); (iii) [DATE] (the “Deadline \
        Date”), if the Network Launch has not occurred as of such date; provided that, the Company \
        shall have the right to extend the Deadline Date by sixty (60) days, in its sole discretion[; and \
        (iv) the failure to obtain net proceeds of more than $[_______] from the sale of all rights \
        pursuant to the SAFTs; provided, that in the case of (iv), the Company shall have the obligation \
        to repay to the Purchasers the aggregate amount of all Purchase Amounts.]",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Definitions",
      },
    ],
  },
  {
    type: "ol",
    items: [
      {
        type: "text",
        variable: false,
        text: "“Discount Price” means the maximum price per Token sold by the Company to the \
        public during the Network Launch multiplied by the Discount Rate",
      },
      {
        type: "text",
        variable: false,
        text: "“Discount Rate” is [ __%]",
      },
      {
        type: "text",
        variable: false,
        text: "“Dissolution Event” means (i) a voluntary termination of operations of the Company, (ii) \
        a general assignment for the benefit of the Company’s creditors or (iii) any other liquidation, \
        dissolution or winding up of the Company, whether voluntary or involuntary.",
      },
      {
        type: "text",
        variable: false,
        text: "“Network Launch” means [a bona fide transaction or series of transactions, pursuant to \
          which the Company will sell the Tokens to the general public in a publicized product launch.]",
      },
      {
        type: "text",
        variable: false,
        text: "“SAFT” means an agreement containing a future right to units of Tokens purchased by \
        Purchasers, similar in form and content to this agreement, which a significant portion of the \
        amount raised under the SAFTs will be used to fund the Company’s development of a \
        decentralized blockchain-based computer network (the “[Network]”) that enables [describe the \
        end goal, function and utility of the proposed Network]",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Company Representations",
      },
    ],
  },
  {
    type: "ol",
    items: [
      {
        type: "text",
        variable: false,
        text: "The Company is a corporation duly organized, validly existing and in good standing \
        under the laws of [STATE], and has the power and authority to own, lease and operate its \
        properties and carry on its business as now conducted",
      },
      {
        type: "text",
        variable: false,
        text: "The execution, delivery and performance by the Company of this instrument is within \
        the power of the Company and, other than with respect to the actions to be taken when Tokens \
        are to be issued to the Purchaser, has been duly authorized by all necessary actions on the part \
        of the Company. This instrument constitutes a legal, valid and binding obligation of the \
        Company, enforceable against the Company in accordance with its terms, except as limited by \
        bankruptcy, insolvency or other laws of general application relating to or affecting the \
        enforcement of creditors’ rights generally and general principles of equity.  To the knowledge of \
        the Company, it is not in violation of (i) its current articles of incorporation or bylaws, (ii) any \
        material statute, rule or regulation applicable to the Company, or (iii) any material indenture or \
        contract to which the Company is a party or by which it is bound, where, in each case, such \
        violation or default, individually, or together with all such violations or defaults, \
        could reasonably \
        be expected to have a material adverse effect on the Company",
      },
      {
        type: "text",
        variable: false,
        text: "To the knowledge of the Company, the performance and consummation of the \
        transactions contemplated by this instrument do not and will not: (i) violate any material \
        judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of \
        any material indenture or contract to which the Company is a party or by which it is bound; or \
        (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the \
        Company or the suspension, forfeiture, or nonrenewal of any material permit, license or \
        authorization applicable to the Company, its business or operations",
      },
      {
        type: "text",
        variable: false,
        text: "No consents or approvals are required in connection with the performance of this \
        instrument, other than: (i) the Company’s corporate approvals; and (ii) any qualifications or \
        filings under applicable securities laws.",
      },
      {
        type: "text",
        variable: false,
        text: "To its knowledge, the Company owns or possesses (or can obtain on commercially \
          reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, \
          copyrights, trade secrets, licenses, information, processes and other intellectual property rights \
          necessary for its business as now conducted and as currently proposed to be conducted, \
          without an infringement of the rights of others.  [Token name] is not a proprietary trade name of \
          the Company",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Purchaser Representations",
      },
    ],
  },
  {
    type: "text",
    items: [
      {
        type: "text",
        variable: false,
        text: "Leaving out remaining for now...",
      },
    ],
  },
];

export { NDA, SAFT };
