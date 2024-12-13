export function generateDotVariations(email: string): string[] {
    const [localPart, domain] = email.split('@')
    if (!localPart || !domain) return []

    const variations: Set<string> = new Set()
    const len = localPart.length

    // Fungsi untuk menghasilkan semua kombinasi posisi dot
    const generateDotPositions = (length: number): number[][] => {
        const result: number[][] = []

        const combine = (current: number[], start: number) => {
            if (current.length > 0) {
                result.push([...current])
            }

            for (let i = start; i < length - 1; i++) {
                if (current.length === 0 || i > current[current.length - 1]) {
                    current.push(i)
                    combine(current, i + 1)
                    current.pop()
                }
            }
        }

        combine([], 1)
        return result
    }

    const dotPositions = generateDotPositions(len)

    dotPositions.forEach(positions => {
        const chars = localPart.split('')
        positions.forEach((pos, index) => {
            chars.splice(pos + index, 0, '.')
        })
        variations.add(`${chars.join('')}@${domain}`)
    })

    return Array.from(variations).sort()
}

export function generatePlusVariations(email: string, suffix: string): string[] {
    const [localPart, domain] = email.split('@')
    if (!localPart || !domain) return []

    return [`${localPart}+${suffix}@${domain}`]
}

export function generateMixVariations(email: string, suffix: string): string[] {
    const dotVariations = generateDotVariations(email)
    const variations: Set<string> = new Set()

    dotVariations.forEach(dotEmail => {
        const [localPart, domain] = dotEmail.split('@')
        if (localPart && domain) {
            variations.add(`${localPart}+${suffix}@${domain}`)
        }
    })

    return Array.from(variations).sort()
}