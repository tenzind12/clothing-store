import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

function DirectoryItem({ category }) {
  const { imageUrl, title } = category;
  const navigate = useNavigate();

  const navigateHandler = () => navigate(`shop/${category.title}`);

  return (
    <DirectoryItemContainer onClick={navigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />

      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
