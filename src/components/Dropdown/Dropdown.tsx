import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";

import Icon from "@/components/Icon/Icon";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import useClickOutside from "@/hooks/useClickOutside";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Genres, Media } from "@/src/types";

import styles from "../Dropdown/Dropdown.module.scss";

interface DropdownProps {
  type: string;
  selected_genre?: Genres.IGenre;
  genre_list?: Genres.IGenre[];
  media?: string;
  network_list?: Media.IServices[] | undefined;
  selected_network?: Media.IServices;
  variant?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  type,
  selected_genre,
  genre_list,
  media,
  network_list,
  selected_network,
  variant,
}) => {
  const { query } = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => closeDropdown());

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <DropdownTrigger
        toggleDropdown={toggleDropdown}
        name={
          variant === "genre"
            ? selected_genre?.name
            : variant === "media"
            ? media
            : selected_network?.provider_name
        }
        isDropdownOpen={isDropdownOpen}
      />
      {isDropdownOpen && variant === "genre" && (
        <ul className={styles.list}>
          {genre_list?.map(({ id, name }) => {
            return (
              <li
                key={id}
                className={selected_genre?.name === name ? styles.listItemCurrent : styles.listItem}
              >
                <Link
                  href={
                    name === DEFAULT_GENRE.name &&
                    !query.slugs?.includes(`${selected_network?.provider_name.toLowerCase()}`)
                      ? `/${type}`
                      : name === DEFAULT_GENRE.name &&
                        query.slugs?.includes(`${selected_network?.provider_name.toLowerCase()}`)
                      ? `/${type}/network/${selected_network?.provider_name.toLowerCase()}`
                      : !query.slugs?.includes(`${selected_network?.provider_name.toLowerCase()}`)
                      ? `/${type}/genre/${name.toLowerCase()}`
                      : `/${type}/genre/${name.toLowerCase()}/${selected_network?.provider_name.toLowerCase()}`
                  }
                >
                  <a className={styles.link} onClick={closeDropdown}>
                    {name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {isDropdownOpen && variant === "media" && (
        <ul className={styles.list}>
          <li className={media === "movies" ? styles.listItemCurrent : styles.listItem}>
            <Link href={"/movies"}>
              <a className={styles.link} onClick={closeDropdown}>
                Movies
              </a>
            </Link>
          </li>
          <li className={media === "series" ? styles.listItemCurrent : styles.listItem}>
            <Link href={"/series"}>
              <a className={styles.link} onClick={closeDropdown}>
                TV series
              </a>
            </Link>
          </li>
        </ul>
      )}
      {isDropdownOpen && variant === "service" && (
        <ul className={styles.list}>
          {network_list?.map(({ provider_id, provider_name }) => {
            return (
              <li
                key={provider_id}
                className={
                  selected_network?.provider_name === provider_name
                    ? styles.listItemCurrent
                    : styles.listItem
                }
              >
                <Link
                  href={
                    provider_name === DEFAULT_NETWORK.provider_name &&
                    !query.slugs?.includes(`${selected_genre?.name?.toLowerCase()}`)
                      ? `/${type}`
                      : provider_name === DEFAULT_NETWORK.provider_name &&
                        query.slugs?.includes(`${selected_genre?.name.toLowerCase()}`)
                      ? `/${type}/genre/${selected_genre?.name.toLowerCase()}`
                      : !query.slugs?.includes(`${selected_genre?.name.toLowerCase()}`)
                      ? `/${type}/network/${provider_name.toLowerCase().toLowerCase()}`
                      : `/${type}/genre/${selected_genre?.name.toLowerCase()}/${provider_name.toLowerCase()}`
                  }
                >
                  <a className={styles.link} onClick={closeDropdown}>
                    {provider_name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

// ==============
// Dropdown Container
// ==============
interface DropdownsContainerProps {
  children: React.ReactNode;
}

export const DropdownsContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

// ==============
// Dropdown Trigger
// ==============

interface DropdownTriggerProps {
  toggleDropdown: () => void;
  name?: string;
  isDropdownOpen: boolean;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  toggleDropdown,
  name,
  isDropdownOpen,
}) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const sm = "15";
  const lg = "20";

  const iconHeight = isMobile ? sm : lg;
  const iconWidth = isMobile ? sm : lg;
  return (
    <button type="button" className={styles.trigger} onClick={toggleDropdown}>
      <>
        {name}
        <div
          className={
            isDropdownOpen
              ? `${styles.chevron} ${styles.open}`
              : `${styles.chevron} ${styles.closed}`
          }
        >
          <span className={styles.icon}>
            <Icon icon="chevronDown" width={iconWidth} height={iconHeight} />
          </span>
        </div>
      </>
    </button>
  );
};
