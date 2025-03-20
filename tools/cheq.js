const REL_ATOMIC_MASS_TABLE = {
    H: 1,
    He: 4,
    Li: 7,
    Be: 9,
    B: 11,
    C: 12,
    N: 14,
    O: 16,
    F: 19,
    Ne: 20,
    Na: 23,
    Mg: 24,
    Al: 27,
    Si: 28,
    P: 31,
    S: 32,
    Cl: 35.5,
    Ar: 40,
    K: 39,
    Ca: 40,
    Sc: 45,
    Ti: 48,
    V: 51,
    Cr: 52,
    Mn: 55,
    Fe: 56,
    Co: 59,
    Ni: 59,
    Cu: 64,
    Zn: 65,
    Ga: 70,
    Ge: 73,
    As: 75,
    Se: 79,
    Br: 80,
    Kr: 84,
    Rb: 85,
    Sr: 88,
    Y: 89,
    Zr: 91,
    Nb: 93,
    Mo: 96,
    Tc: 98,
    Ru: 101,
    Rh: 103,
    Pd: 106,
    Ag: 108,
    Cd: 112,
    In: 115,
    Sn: 119,
    Sb: 122,
    Te: 128,
    I: 127,
    Xe: 131,
    Cs: 133,
    Ba: 137,
    La: 139,
    Ce: 140,
    Pr: 141,
    Nd: 144,
    Pm: 145,
    Sm: 150,
    Eu: 152,
    Gd: 157,
    Tb: 159,
    Dy: 162,
    Ho: 165,
    Er: 167,
    Tm: 169,
    Yb: 173,
    Lu: 175,
    Hf: 178,
    Ta: 181,
    W: 184,
    Re: 186,
    Os: 190,
    Ir: 192,
    Pt: 195,
    Au: 197,
    Hg: 201,
    Tl: 204,
    Pb: 207,
    Bi: 209,
    Po: 209,
    At: 210,
    Rn: 222,
    Fr: 223,
    Ra: 226,
    Ac: 227,
    Th: 232,
    Pa: 231,
    U: 238,
    Np: 237,
    Pu: 244,
    Am: 243,
    Cm: 247,
    Bk: 247,
    Cf: 251,
    Es: 252,
    Fm: 257,
    Md: 258,
    No: 259,
    Lr: 262,
    Rf: 267,
    Db: 270,
    Sg: 271,
    Bh: 270,
    Hs: 277,
    Mt: 278,
    Ds: 281,
    Rg: 282,
    Cn: 285,
    Nh: 286,
    Fl: 289,
    Mc: 290,
    Lv: 293,
    Ts: 294,
    Og: 294,
};

const ELEMENTS = new Set(Object.keys(REL_ATOMIC_MASS_TABLE));

/**
 * 
 * @param {string} elem 
 * @returns {string}
 */
function toStd(elem) {
    if (elem.length == 1) {
        return elem[0].toUpperCase()
    }
    else if (elem.length == 2) {
        return elem[0].toUpperCase() + elem[1].toLowerCase()
    }
}

/**
 * Calculates the molecular mass of a chemical formula.
 * @param {string} rawChEq - The chemical equation string (e.g., "H2O", "C6H12O6").
 * @returns {number} The total molecular mass.
 */
function calc(rawChEq) {
    let mass = 0;
    let currentElement = "";
    let index = 0;

    while (index < rawChEq.length) {
        const char = rawChEq[index];
        const nextChar = index + 1 < rawChEq.length ? rawChEq[index + 1] : "";

        if (/[A-Za-z]/.test(char)) {
            currentElement += char;
            if (/[a-z]/.test(nextChar)) {
                currentElement += nextChar;
                index++;
            }

            currentElement = toStd(currentElement)
            if (ELEMENTS.has(currentElement)) {
                let count = 1;
                if (/\d/.test(nextChar)) {
                    count = parseInt(nextChar, 10);
                    index++;
                }
                mass += REL_ATOMIC_MASS_TABLE[currentElement] * count;
                currentElement = "";
            }
        }
        index++;
    }

    return mass
}

// console.log(calc("H2SO4"))