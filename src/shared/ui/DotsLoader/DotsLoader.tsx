import { DotsContainer, LoaderDot, LoaderWrapper } from './DotsLoader.style';

export function DotsLoader() {
  return (
    <LoaderWrapper>
      <DotsContainer>
        {[0, 1, 2].map((i) => (
          <LoaderDot key={i} />
        ))}
      </DotsContainer>
    </LoaderWrapper>
  );
}
