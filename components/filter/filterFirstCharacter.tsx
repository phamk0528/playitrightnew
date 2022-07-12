import { Box, Button, ButtonProps, SimpleGrid } from "@chakra-ui/react";
import { FRIST_CHARACTERS } from "../../constants/index";
import useColorTheme from "../../hooks/useColorTheme";

interface PropsFistCharacterItem extends ButtonProps {
  handleFristChar?: any;
  params?: any;
  value?: any;
}

const FistCharacterItem = ({
  children,
  handleFristChar,
  params,
  value,
}: PropsFistCharacterItem) => {
  const colors = useColorTheme();
  return (
    <>
      <Button
        as="button"
        borderRadius="0px"
        p="0"
        w="36px"
        h={9}
        onClick={() => handleFristChar()}
        backgroundColor="white"
        border="1px"
        borderColor={colors.primary}
        color={colors.primary}
        _hover={{ bg: colors.primary, color: "white" }}
        _active={{ bg: colors.primary, color: "white" }}
        _focus={{ bg: colors.primary, color: "white" }}
        isActive={params === value ? true : false}
      >
        {children}
      </Button>
    </>
  );
};

type Props = {
  handleFristChar?: any;
  params?: any;
};

const FilterFirstCharacter = ({ handleFristChar, params }: Props) => {
  return (
    <>
      <SimpleGrid paddingX="1rem" paddingY=".5rem" columns={{ base: 7, lg: 28 }} spacing="1.5px">
        {FRIST_CHARACTERS.map((character: any) => {
          return (
            <FistCharacterItem
              value={character.value}
              params={params}
              key={character.value}
              handleFristChar={() => handleFristChar(character.value)}
            >
              {character.title}
            </FistCharacterItem>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default FilterFirstCharacter;
