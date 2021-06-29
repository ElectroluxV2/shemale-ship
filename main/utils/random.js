export class Random {
    static getSeededRandom(seed) {
        const mask = 0xffffffff;
        let m_w = (123456789 + seed) & mask;
        let m_z = (987654321 - seed) & mask;

        return function () {
            m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
            m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

            let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
            result /= 4294967296;
            return result;
        }
    }
}
