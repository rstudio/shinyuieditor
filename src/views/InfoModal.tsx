/** @jsxImportSource @emotion/react */
import { Button, CloseButton, Heading } from "@chakra-ui/react";
import { css } from "@emotion/react";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { atom, useRecoilValue, useResetRecoilState } from "recoil";

export const modalStateAtom = atom<{
  title: string;
  content: React.ReactNode;
} | null>({
  key: "modalState",
  default: null,
});

export function useCloseModal() {
  const closeModal = useResetRecoilState(modalStateAtom);
  return closeModal;
}

export default function InfoModal() {
  const modalState = useRecoilValue(modalStateAtom);
  const closeModal = useResetRecoilState(modalStateAtom);

  if (modalState === null) return null;

  return (
    <div
      css={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        position: "absolute",
        inset: "0",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div css={modalStyles}>
        <Heading>{modalState.title}</Heading>
        <CloseButton
          position="absolute"
          right="4px"
          top="4px"
          onClick={closeModal}
        />

        <div
          css={{
            gridArea: "body",
            alignSelf: "center",
            width: "100%",
            maxWidth: "400px",
            position: "relative",
          }}
        >
          {modalState.content}
        </div>
      </div>
    </div>
  );
}

const modalStyles = css`
  box-shadow: var(--shadow);
  background-color: var(--rstudio-white);
  border-radius: var(--corner-radius);
  padding: 4rem 5rem;
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  width: 750px;
  max-width: 95vw;
  grid-template-rows: 70px 1fr;
  grid-template-columns: 1fr;
  position: relative;
  grid-template-areas:
    "title"
    "body";
`;
