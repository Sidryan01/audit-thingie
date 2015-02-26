// Write your package code here!

Template.contractList.helpers({
  contractCollection: function () {
    return Contracts.find({});
  } ,

  settings: function () {
    return {
      collection: 'contracts',
      rowsPerPage: 10,
      showFilter: true,
      fields: [ {key:'name', label: "Name",
                 tmpl: Template.nameTmpl},
                {key: 'sector',
                 label: "Business Sector"},
                {key: 'est_cost',
                 label: "Estimated Cost"}]
    };
  }


});

Template.contractDisplay.helpers({
  keyFacFigs: function () {
    return KeyFacFigs.find({contractId: this._id});
  },
  est_cost: function () {
    if (this.est_cost && this.est_cost.toFixed)
      return this.est_cost.toFixed(2);
    return this.est_cost;
  }
});

Template.contractEdit.helpers({
  keyFacFigs: function () {
    return KeyFacFigs.find({contractId: this._id});
  },
});

Template.keyFacFig.events({
  'click a' : function () {
    Session.set("modal-template", 'editKeyFacFig');
    Session.set("modal-data", this);

    $("#site-modal").modal('toggle');
  }
});

Template.editKeyFacFig.events({
  'click button#save' : function (evt, template) {
    toSet = {userId: Meteor.userId()};
    if (template.$('input#data').val() != this.data)
      toSet.data = template.$('input#data').val();
    if (template.$('input#date').val() != this.date)
      toSet.date = template.$('input#date').val();
    if (template.$('input#date_end').val() != this.date_end)
      toSet.date_end = template.$('input#date_end').val();
    if (template.$('input#typeId').val() != this.typeId)
      toSet.typeId = template.$('input#typeId').val();
    if (template.$('textarea#description').val() != this.description)
      toSet.description = template.$('textarea#description').val();

    KeyFacFigs.update(this._id, {$set: toSet});

    $("#site-modal").modal('toggle');
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  },
  'click button#cancel' : function (evt, template) {
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  }
});
