import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles';

function DirectoryItem({ category }) {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />

      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
