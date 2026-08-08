import { site } from '@/content/site'

/**
 * JSON-LD builders.
 *
 * Everything here is derived from `content/site.ts`. There is deliberately no
 * second copy of the facts: if the visible page and the structured data ever
 * disagree, search engines treat it as a spam signal, and keeping two lists in
 * sync by hand is how that happens.
 */

const { meta, person, social, certifications, experience, skills, faq } = site

const abs = (p: string) => new URL(p, meta.url).toString()

/** Stable @id for the Person node, so other nodes can reference it. */
const PERSON_ID = `${meta.url}/#person`

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    jobTitle: person.title,
    description: person.bio.join(' '),
    url: meta.url,
    // The generated social card, not a portrait — there is no photo on the site.
    image: abs('/opengraph-image'),
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phone,
    // sameAs is what links this site to the same person on other platforms.
    sameAs: social.map((s) => s.href),
    knowsAbout: skills.flatMap((c) => c.skills.map((s) => s.name)),
    ...(person.location ? { address: { '@type': 'PostalAddress', addressLocality: person.location } } : {}),
    worksFor: {
      '@type': 'Organization',
      name: experience[0].company,
    },
    hasOccupation: experience.map((role) => ({
      '@type': 'Occupation',
      name: role.role,
      occupationLocation: { '@type': 'Organization', name: role.company },
    })),
    hasCredential: certifications
      .filter((c) => c.status === 'earned')
      .map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
      })),
  }
}

export function profilePageSchema() {
  return {
    '@type': 'ProfilePage',
    '@id': `${meta.url}/#profilepage`,
    url: meta.url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'en',
    mainEntity: { '@id': PERSON_ID },
  }
}

export function faqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${meta.url}/#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${meta.url}/#website`,
    url: meta.url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  }
}

/** The home page graph: one @graph so nodes can cross-reference by @id. */
export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteSchema(), personSchema(), profilePageSchema(), faqSchema()],
  }
}

