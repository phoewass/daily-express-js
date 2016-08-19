# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "bootstrap.sh", privileged: false
  config.vm.network :forwarded_port, guest: 3000, host: 3000, auto_correct: true
  config.vm.synced_folder '.', '/vagrant'

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--usb", "off"]
    vb.customize ["modifyvm", :id, "--usbehci", "off"]
    vb.customize ["modifyvm", :id, "--memory", "512"]
    vb.customize ["modifyvm", :id, "--nictype1", "Am79C973"]
  end

end
