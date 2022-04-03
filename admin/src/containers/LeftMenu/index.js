import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  LeftMenuLinksSection,
  LeftMenuFooter,
  LeftMenuHeader,
  LinksContainer,
} from '../../components/LeftMenu';
import Loader from './Loader';
import Wrapper from './Wrapper';
import useMenuSections from './useMenuSections';

const LeftMenu = ({ shouldUpdateStrapi, version, plugins, setUpdateMenu }) => {
  const location = useLocation();

  const {
    state: {
      isLoading,
      collectionTypesSectionLinks,
      singleTypesSectionLinks,
      generalSectionLinks,
      pluginsSectionLinks,
    },
    toggleLoading,
    generateMenu,
  } = useMenuSections(plugins, shouldUpdateStrapi);

  const homeLinks = [
    {
      icon: 'circle',
      label: 'Home',
      destination: '/plugins/content-manager/singleType/application::home.home',
      isDisplayed: true,
      notificationsCount: 0,
      permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::home.home" }]
    }
  ];
  const productLinks = [
    {
      icon: 'circle',
      label: 'Product Page',
      destination: '/plugins/content-manager/singleType/application::product.product',
      isDisplayed: true,
      notificationsCount: 0,
      permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::product.product" }]
    },
    {
      icon: 'circle',
      label: 'Products',
      destination: '/plugins/content-manager/collectionType/application::products.products',
      isDisplayed: true,
      notificationsCount: 0,
      permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::products.products" }]
    }
  ];

  const aboutLinks = [
    {
        icon: 'circle',
        label: 'About',
        destination: '/plugins/content-manager/singleType/application::about.about',
        isDisplayed: true,
        notificationsCount: 0,
        permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::about.about" }]
    }
  ];

  const contactLinks = [
    {
        icon: 'circle',
        label: 'Contact Us',
        destination: '/plugins/content-manager/singleType/application::contact-us.contact-us',
        isDisplayed: true,
        notificationsCount: 0,
        permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::contact-us.contact-us" }]
    }
  ];

  const recipesLinks = [
    {
      icon: 'circle',
      label: 'Recipes',
      destination: '/plugins/content-manager/collectionType/application::recipes.recipes',
      isDisplayed: true,
      notificationsCount: 0,
      permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::recipes.recipes" }]
    },
    {
      icon: 'circle',
      label: 'Recipes Page',
      destination: '/plugins/content-manager/singleType/application::recipe.recipe',
      isDisplayed: true,
      notificationsCount: 0,
      permissions: [{ action: 'plugins::content-manager.explorer.read', subject: "application::recipe.recipe" }]
    }
  ];


  const filteredCollectionTypeLinks = collectionTypesSectionLinks.filter(
    ({ isDisplayed }) => isDisplayed
  );
  const filteredSingleTypeLinks = singleTypesSectionLinks.filter(({ isDisplayed }) => isDisplayed);

  // This effect is really temporary until we create the menu api
  // We need this because we need to regenerate the links when the settings are being changed
  // in the content manager configurations list
  useEffect(() => {
    setUpdateMenu(() => {
      toggleLoading();
      generateMenu();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Loader show={isLoading} />
      <LeftMenuHeader />
      <LinksContainer>
        <LeftMenuLinksSection
            section="home"
            name="home"
            links={homeLinks}
            location={location}
            searchable={false}
          />
        <LeftMenuLinksSection
            section="about"
            name="about"
            links={aboutLinks}
            location={location}
            searchable={false}
          />
        <LeftMenuLinksSection
            section="products"
            name="products"
            links={productLinks}
            location={location}
            searchable={false}
          />
        <LeftMenuLinksSection
            section="recipes"
            name="recipes"
            links={recipesLinks}
            location={location}
            searchable={false}
          />
        <LeftMenuLinksSection
            section="contact"
            name="contact"
            links={contactLinks}
            location={location}
            searchable={false}
          />
        {filteredCollectionTypeLinks.length > 0 && (
          <LeftMenuLinksSection
            section="collectionType"
            name="collectionType"
            links={filteredCollectionTypeLinks}
            location={location}
            searchable
          />
        )}
        {filteredSingleTypeLinks.length > 0 && (
          <LeftMenuLinksSection
            section="singleType"
            name="singleType"
            links={filteredSingleTypeLinks}
            location={location}
            searchable
          />
        )}

        {pluginsSectionLinks.length > 0 && (
          <LeftMenuLinksSection
            section="plugins"
            name="plugins"
            links={pluginsSectionLinks}
            location={location}
            searchable={false}
            emptyLinksListMessage="app.components.LeftMenuLinkContainer.noPluginsInstalled"
          />
        )}
        {generalSectionLinks.length > 0 && (
          <LeftMenuLinksSection
            section="general"
            name="general"
            links={generalSectionLinks}
            location={location}
            searchable={false}
          />
        )}
      </LinksContainer>
      <LeftMenuFooter key="footer" version={version} />
    </Wrapper>
  );
};

LeftMenu.propTypes = {
  shouldUpdateStrapi: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired,
  plugins: PropTypes.object.isRequired,
  setUpdateMenu: PropTypes.func.isRequired,
};

export default memo(LeftMenu);
