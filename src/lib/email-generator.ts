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

export function generatePlusVariations(email: string): string[] {
    const [localPart, domain] = email.split('@')
    if (!localPart || !domain) return []

    const variations: string[] = []
    const commonSuffixes = [
        // Angka
        '1', '2', '3', '123', '2024',
        // Umum
        'mail', 'email', 'spam', 'noreply',
        // Kategori
        'shop', 'store', 'shopping',
        'social', 'media', 'facebook', 'instagram',
        'work', 'job', 'business',
        'personal', 'private',
        // Layanan
        'newsletter', 'promo', 'info',
        'support', 'help', 'contact',
        // Lainnya
        'temp', 'test', 'dev',
        'backup', 'archive',
        'main', 'alt', 'alias'
    ]

    commonSuffixes.forEach(suffix => {
        variations.push(`${localPart}+${suffix}@${domain}`)
    })

    return variations.sort()
}

export function generateMixVariations(email: string): string[] {
    const dotVariations = generateDotVariations(email)
    const variations: Set<string> = new Set()

    const commonSuffixes = [
        '1', '2', 'mail', 'shop',
        'social', 'work', 'personal',
        'backup', 'spam', 'noreply'
    ]

    dotVariations.forEach(dotEmail => {
        const [localPart, domain] = dotEmail.split('@')
        if (localPart && domain) {
            commonSuffixes.forEach(suffix => {
                variations.add(`${localPart}+${suffix}@${domain}`)
            })

            for (let i = 1; i <= 5; i++) {
                variations.add(`${localPart}+${i}@${domain}`)
            }

            const currentYear = new Date().getFullYear()
            variations.add(`${localPart}+${currentYear}@${domain}`)
        }
    })

    return Array.from(variations).sort()
} 