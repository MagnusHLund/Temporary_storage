import ContentBox from '../content/ContentBox'
import ProgressBar from '../content/ProgressBar'
import Button from '../inputs/Button'
import Dropdown from '../inputs/Dropdown'
import './UploadSection.scss'

const UploadSection = () => {
  const isUploading = false

  return (
    <section className="upload-section">
      <ContentBox title="Upload">
        {isUploading && (
          <form className="upload-section__form">
            <p>Upload your zip file!</p>
            <Button type="file" text="Select file" required={true} />
            <Dropdown />
            <Button
              type="checkbox"
              text="Accept the terms of service"
              required={true}
              textClickRedirectRoute="ToS"
            />
            <Button type="submit" text="upload" />
          </form>
        )}

        {!isUploading && <ProgressBar uploadPercentage={0} />}
      </ContentBox>
    </section>
  )
}

export default UploadSection
