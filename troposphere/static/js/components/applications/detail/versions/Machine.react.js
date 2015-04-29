define(function (require) {

  var React = require('react'),
      Backbone = require('backbone'),
      Time = require('components/common/Time.react'),
      Gravatar = require('components/common/Gravatar.react'),
      CryptoJS = require('crypto'),
      stores = require('stores');
      actions = require('actions');

  return React.createClass({

    propTypes: {
      machine: React.PropTypes.instanceOf(Backbone.Model).isRequired,
      application: React.PropTypes.instanceOf(Backbone.Model).isRequired,
    },

    handleEditMachineDetails: function(){
      this.showMachineEditModal(this.props.machine);
    },
    //Observation - Should this be in machineList to dictate AT MOST 1?
      showMachineEditModal: function (machine) {
        actions.ProviderMachineActions.edit(machine, this.props.application);
      },


    renderEditLink: function(){
      var profile = stores.ProfileStore.get(),
          image = this.props.application;

      if(profile.id && profile.get('username') === image.get('created_by').username){
        return (
          <div className="edit-link-row">
            <a className="edit-link" onClick={this.handleEditMachineDetails}>Edit Version</a>
          </div>
        )
      }
    },
    render: function () {
      // todo: figure out if anything is ever recommended, or if it's just a concept idea
      var machine = this.props.machine,
          isRecommended = false,
          dateCreated = this.props.machine.get('start_date').format("M/DD/YYYY"),
          machineHash = CryptoJS.MD5(machine.id.toString()).toString(),
          iconSize = 63,
          type = stores.ProfileStore.get().get('icon_set');

      return (
        <li>
          <div>
            <Gravatar hash={machineHash} size={iconSize} type={type}/>
            <div className="image-version-details">
              <div className="version">
                {machine.get('pretty_version')}
                {isRecommended ? <span className="recommended-tag">Recommended</span> : null}
              </div>
              <div>{dateCreated}</div>
              <div>{machine.get('ownerid')}</div>
            </div>
            {this.renderEditLink()}
          </div>
        </li>
      );
    }

  });

});
