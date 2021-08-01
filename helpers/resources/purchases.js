// Copyright (c) 2021 Harry [Majored] [hello@majored.pw]
// MIT License (https://github.com/Majored/mcm-js-api-wrapper/blob/main/LICENSE)

/* construct */
let object = {};

/* initialise */
object.init = function(wrapper) {
  this.wrapper = wrapper;
  return this;
};

/* functions */
// List purchases for a given resource.
object.list = async function(resource_id, sort_options) {
  return await this.wrapper.get(`/resources/${resource_id}/purchases`, sort_options);
};

object.list_all = async function(resource_id, sort_options) {
  return await this.wrapper.list_until(
    `/resources/${resource_id}/purchases`, function(e) { return true; }, sort_options
  );
};

object.list_until = async function(resource_id, should_continue, sort_options) {
  return await this.wrapper.list_until(`/resources/${resource_id}/purchases`, should_continue, sort_options);
};

// Fetch a purchase for a given resource.
object.fetch = async function(resource_id, purchase_id) {
  return await this.wrapper.get(`/resources/${resource_id}/purchases/${purchase_id}`);
};

/* exports */
module.exports = object;
