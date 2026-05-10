import { useTranslations } from 'next-intl'
import React from 'react'

const Page = () => {
  const t = useTranslations("Pages")
  return (
    <div>
      {t("kpis")}
    </div>
  )
}

export default Page
