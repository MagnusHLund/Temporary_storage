import ContentBox from '../content/ContentBox'
import Button from '../inputs/Button'
import './DownloadSection.scss'

const DownloadSection = () => {
  return (
    <section>
      <ContentBox title="Download">
        <p>Download file</p>
        <Button text="Download" />
      </ContentBox>
    </section>
  )
}

export default DownloadSection
