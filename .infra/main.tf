locals {
  service_prefix = "pwdgame"
}

terraform {
  backend "azurerm" {
    container_name       = "tfstate"
    key                  = "pwdgame-state"
    # Remaining parameters from -backend-config argument
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=2.55.0"
    }
  }
}

provider "azurerm" {
  features {}
  environment = var.azure_environment
  # Service principal credential from env variables
  # https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret#configuring-the-service-principal-in-terraform
}

resource "random_string" "random" {
  length           = 6
  special          = true
  upper            = false
  override_special = ""
}

# Create Resource Group
resource "azurerm_resource_group" "main_rg" {
  name     = var.azure_resource_group_name
  location = var.azure_region
}